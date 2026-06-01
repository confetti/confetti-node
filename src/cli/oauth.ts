import crypto from 'node:crypto'
import http from 'node:http'
import { spawn } from 'node:child_process'
import nodeFetch from 'node-fetch'
import { getHostCredentials, setHostCredentials, clearHostTokens, type HostCredentials } from './storage.js'

const CLIENT_NAME = 'Confetti CLI'
const SCOPE = 'public_api'
const CALLBACK_PORTS = [52701, 52702, 52703]
const LOGIN_TIMEOUT_MS = 5 * 60 * 1000
const EXPIRY_SKEW_MS = 60 * 1000

export interface HostTarget {
  host: string
  protocol: string
}

interface OAuthEndpoints {
  authorizationEndpoint: string
  tokenEndpoint: string
  registrationEndpoint?: string
  revocationEndpoint?: string
}

interface TokenResponse {
  accessToken: string
  refreshToken?: string
  scope?: string
  tokenType?: string
  expiresAt?: number
}

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] || char)
}

function getString(obj: object, key: string): string | undefined {
  const value: unknown = Reflect.get(obj, key)
  return typeof value === 'string' ? value : undefined
}

function getStringArray(obj: object, key: string): string[] {
  const value: unknown = Reflect.get(obj, key)
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function base64url(buffer: Buffer): string {
  return buffer.toString('base64url')
}

function createPkce(): { verifier: string; challenge: string } {
  const verifier = base64url(crypto.randomBytes(32))
  const challenge = base64url(crypto.createHash('sha256').update(verifier).digest())
  return { verifier, challenge }
}

function baseUrlOf(target: HostTarget): string {
  return `${target.protocol}://${target.host}`
}

async function discover(target: HostTarget): Promise<OAuthEndpoints> {
  const url = `${baseUrlOf(target)}/.well-known/oauth-authorization-server`
  const res = await nodeFetch(url)
  if (!res.ok) throw new Error(`OAuth discovery failed (${res.status}) at ${url}`)

  const doc: unknown = await res.json()
  if (typeof doc !== 'object' || doc === null) throw new Error('Invalid OAuth discovery document')

  const authorizationEndpoint = getString(doc, 'authorization_endpoint')
  const tokenEndpoint = getString(doc, 'token_endpoint')
  if (!authorizationEndpoint || !tokenEndpoint) {
    throw new Error('OAuth discovery document is missing required endpoints')
  }

  const methods = getStringArray(doc, 'code_challenge_methods_supported')
  if (methods.length > 0 && !methods.includes('S256')) {
    throw new Error('Authorization server does not support PKCE (S256)')
  }

  return {
    authorizationEndpoint,
    tokenEndpoint,
    registrationEndpoint: getString(doc, 'registration_endpoint'),
    revocationEndpoint: getString(doc, 'revocation_endpoint'),
  }
}

async function registerClient(registrationEndpoint: string, redirectUris: string[]): Promise<string> {
  const res = await nodeFetch(registrationEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_name: CLIENT_NAME,
      redirect_uris: redirectUris,
      token_endpoint_auth_method: 'none',
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      scope: SCOPE,
    }),
  })

  if (!res.ok) {
    throw new Error(`Client registration failed (${res.status}): ${await res.text()}`)
  }

  const body: unknown = await res.json()
  if (typeof body !== 'object' || body === null) throw new Error('Invalid client registration response')

  const clientId = getString(body, 'client_id')
  if (!clientId) throw new Error('Client registration response is missing client_id')
  return clientId
}

async function requestToken(tokenEndpoint: string, params: Record<string, string>): Promise<TokenResponse> {
  const res = await nodeFetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params).toString(),
  })

  const body: unknown = await res.json().catch(() => null)

  if (!res.ok) {
    const detail = body && typeof body === 'object' ? getString(body, 'error') : undefined
    throw new Error(`Token request failed (${res.status})${detail ? `: ${detail}` : ''}`)
  }
  if (typeof body !== 'object' || body === null) throw new Error('Invalid token response')

  const accessToken = getString(body, 'access_token')
  if (!accessToken) throw new Error('Token response is missing access_token')

  const expiresInRaw: unknown = Reflect.get(body, 'expires_in')
  const expiresIn = typeof expiresInRaw === 'number' ? expiresInRaw : 0

  return {
    accessToken,
    refreshToken: getString(body, 'refresh_token'),
    scope: getString(body, 'scope'),
    tokenType: getString(body, 'token_type'),
    expiresAt: Date.now() + expiresIn * 1000,
  }
}

function openBrowser(url: string): void {
  const platform = process.platform
  const command = platform === 'darwin' ? 'open' : platform === 'win32' ? 'cmd' : 'xdg-open'
  const args = platform === 'win32' ? ['/c', 'start', '', url] : [url]
  try {
    const child = spawn(command, args, { stdio: 'ignore', detached: true })
    child.on('error', () => {})
    child.unref()
  } catch {
    // Non-fatal: the URL is always printed so it can be opened manually.
  }
}

function listen(server: http.Server, ports: number[]): Promise<number> {
  return new Promise((resolve, reject) => {
    let index = 0
    const tryNext = (): void => {
      if (index >= ports.length) {
        reject(new Error(`All callback ports are in use (${ports.join(', ')})`))
        return
      }
      const port = ports[index++]
      server.once('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') tryNext()
        else reject(err)
      })
      server.listen(port, '127.0.0.1', () => {
        server.removeAllListeners('error')
        resolve(port)
      })
    }
    tryNext()
  })
}

function buildAuthorizeUrl(
  endpoint: string,
  params: { clientId: string; redirectUri: string; challenge: string; state: string },
): string {
  const url = new URL(endpoint)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', params.clientId)
  url.searchParams.set('redirect_uri', params.redirectUri)
  url.searchParams.set('scope', SCOPE)
  url.searchParams.set('state', params.state)
  url.searchParams.set('code_challenge', params.challenge)
  url.searchParams.set('code_challenge_method', 'S256')
  return url.toString()
}

function page(title: string, message: string): string {
  return (
    `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head>` +
    `<body style="font-family: system-ui, sans-serif; text-align: center; padding: 3rem;">` +
    `<h1>${title}</h1><p>${message}</p></body></html>`
  )
}

async function captureAuthorizationCode(opts: {
  authorizationEndpoint: string
  clientId: string
  challenge: string
  state: string
  openBrowser: boolean
}): Promise<{ code: string; redirectUri: string }> {
  const server = http.createServer()
  const port = await listen(server, CALLBACK_PORTS)
  const redirectUri = `http://127.0.0.1:${port}/callback`
  const authorizeUrl = buildAuthorizeUrl(opts.authorizationEndpoint, {
    clientId: opts.clientId,
    redirectUri,
    challenge: opts.challenge,
    state: opts.state,
  })

  console.log('\nOpening your browser to authorize the Confetti CLI…')
  console.log(`If it does not open automatically, visit:\n\n  ${authorizeUrl}\n`)
  if (opts.openBrowser) openBrowser(authorizeUrl)
  console.log('Waiting for authorization…')

  try {
    const code = await new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Timed out waiting for authorization')), LOGIN_TIMEOUT_MS)
      server.on('request', (req, res) => {
        const reqUrl = new URL(req.url || '/', redirectUri)
        if (reqUrl.pathname !== '/callback') {
          res.statusCode = 404
          res.end('Not found')
          return
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        const returnedCode = reqUrl.searchParams.get('code')
        const returnedState = reqUrl.searchParams.get('state')
        const error = reqUrl.searchParams.get('error')
        if (error) {
          res.end(page('Authorization failed', escapeHtml(error)))
          clearTimeout(timer)
          reject(new Error(`Authorization failed: ${error}`))
          return
        }
        if (!returnedCode || returnedState !== opts.state) {
          res.end(page('Authorization failed', 'The response could not be verified.'))
          clearTimeout(timer)
          reject(new Error('Authorization response failed state validation'))
          return
        }
        res.end(page('Signed in', 'You can close this tab and return to the terminal.'))
        clearTimeout(timer)
        resolve(returnedCode)
      })
    })
    return { code, redirectUri }
  } finally {
    server.close()
  }
}

export async function login(target: HostTarget, options: { openBrowser: boolean }): Promise<HostCredentials> {
  const endpoints = await discover(target)

  const existing = getHostCredentials(target.host)
  let clientId = existing.clientId
  if (!clientId) {
    if (!endpoints.registrationEndpoint) {
      throw new Error('Authorization server does not support dynamic client registration')
    }
    const redirectUris = CALLBACK_PORTS.map((port) => `http://127.0.0.1:${port}/callback`)
    clientId = await registerClient(endpoints.registrationEndpoint, redirectUris)
    setHostCredentials(target.host, { clientId })
  }

  const { verifier, challenge } = createPkce()
  const state = base64url(crypto.randomBytes(16))

  const { code, redirectUri } = await captureAuthorizationCode({
    authorizationEndpoint: endpoints.authorizationEndpoint,
    clientId,
    challenge,
    state,
    openBrowser: options.openBrowser,
  })

  const token = await requestToken(endpoints.tokenEndpoint, {
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  })

  const credentials: HostCredentials = {
    clientId,
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    expiresAt: token.expiresAt,
    scope: token.scope,
    tokenType: token.tokenType,
  }
  setHostCredentials(target.host, credentials)
  return credentials
}

export async function refresh(target: HostTarget): Promise<HostCredentials> {
  const creds = getHostCredentials(target.host)
  if (!creds.refreshToken || !creds.clientId) throw new Error('not_authenticated')

  const endpoints = await discover(target)
  let token: TokenResponse
  try {
    token = await requestToken(endpoints.tokenEndpoint, {
      grant_type: 'refresh_token',
      refresh_token: creds.refreshToken,
      client_id: creds.clientId,
    })
  } catch (err) {
    // A failed refresh (rotation reuse, expiry, or the 90-day cap) is terminal.
    clearHostTokens(target.host)
    throw err
  }

  const updated: HostCredentials = {
    clientId: creds.clientId,
    accessToken: token.accessToken,
    refreshToken: token.refreshToken || creds.refreshToken,
    expiresAt: token.expiresAt,
    scope: token.scope,
    tokenType: token.tokenType,
  }
  setHostCredentials(target.host, updated)
  return updated
}

export async function ensureAccessToken(target: HostTarget): Promise<string> {
  const creds = getHostCredentials(target.host)
  if (!creds.accessToken) throw new Error('not_authenticated')
  if (creds.expiresAt && Date.now() >= creds.expiresAt - EXPIRY_SKEW_MS) {
    const refreshed = await refresh(target)
    if (!refreshed.accessToken) throw new Error('not_authenticated')
    return refreshed.accessToken
  }
  return creds.accessToken
}

export async function logout(target: HostTarget): Promise<void> {
  const creds = getHostCredentials(target.host)
  if (creds.refreshToken && creds.clientId) {
    try {
      const endpoints = await discover(target)
      if (endpoints.revocationEndpoint) {
        await nodeFetch(endpoints.revocationEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ token: creds.refreshToken, client_id: creds.clientId }).toString(),
        })
      }
    } catch {
      // Best-effort revocation — always clear the local tokens regardless.
    }
  }
  clearHostTokens(target.host)
}
