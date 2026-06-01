import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import nock from 'nock'
import { refresh, ensureAccessToken, type HostTarget } from '../../src/cli/oauth.js'
import { getHostCredentials, setHostCredentials } from '../../src/cli/storage.js'

const target: HostTarget = { host: 'oauth.test', protocol: 'http' }
const base = 'http://oauth.test'

function discovery(extra: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    issuer: base,
    authorization_endpoint: `${base}/authorize`,
    token_endpoint: `${base}/token`,
    registration_endpoint: `${base}/register`,
    revocation_endpoint: `${base}/revoke`,
    code_challenge_methods_supported: ['S256'],
    ...extra,
  }
}

describe('CLI oauth', () => {
  let dir: string
  let previous: string | undefined

  beforeEach(() => {
    previous = process.env['XDG_CONFIG_HOME']
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'confetti-oauth-'))
    process.env['XDG_CONFIG_HOME'] = dir
    nock.cleanAll()
  })

  afterEach(() => {
    if (previous === undefined) delete process.env['XDG_CONFIG_HOME']
    else process.env['XDG_CONFIG_HOME'] = previous
    fs.rmSync(dir, { recursive: true, force: true })
    nock.cleanAll()
  })

  test('refresh rotates and persists the new refresh token', async () => {
    setHostCredentials(target.host, { clientId: 'client-1', refreshToken: 'old-refresh', accessToken: 'old' })
    const scope = nock(base)
      .get('/.well-known/oauth-authorization-server')
      .reply(200, discovery())
      .post('/token')
      .reply(200, {
        access_token: 'new-access',
        refresh_token: 'new-refresh',
        expires_in: 900,
        scope: 'public_api',
        token_type: 'Bearer',
      })

    const result = await refresh(target)
    assert.strictEqual(result.accessToken, 'new-access')
    assert.strictEqual(result.refreshToken, 'new-refresh')
    assert.strictEqual(getHostCredentials(target.host).refreshToken, 'new-refresh')
    assert.strictEqual(scope.isDone(), true)
  })

  test('refresh failure clears the stored tokens but keeps the clientId', async () => {
    setHostCredentials(target.host, { clientId: 'client-1', refreshToken: 'bad', accessToken: 'old' })
    nock(base)
      .get('/.well-known/oauth-authorization-server')
      .reply(200, discovery())
      .post('/token')
      .reply(400, { error: 'invalid_grant' })

    await assert.rejects(() => refresh(target), /Token request failed/)
    const stored = getHostCredentials(target.host)
    assert.strictEqual(stored.accessToken, undefined)
    assert.strictEqual(stored.refreshToken, undefined)
    assert.strictEqual(stored.clientId, 'client-1')
  })

  test('discovery rejects when S256 is not supported', async () => {
    setHostCredentials(target.host, { clientId: 'client-1', refreshToken: 'r' })
    nock(base)
      .get('/.well-known/oauth-authorization-server')
      .reply(200, discovery({ code_challenge_methods_supported: ['plain'] }))

    await assert.rejects(() => refresh(target), /S256/)
  })

  test('ensureAccessToken refreshes proactively when the token is expired', async () => {
    setHostCredentials(target.host, {
      clientId: 'client-1',
      refreshToken: 'r',
      accessToken: 'old',
      expiresAt: Date.now() - 1000,
    })
    nock(base)
      .get('/.well-known/oauth-authorization-server')
      .reply(200, discovery())
      .post('/token')
      .reply(200, { access_token: 'fresh', refresh_token: 'r2', expires_in: 900 })

    assert.strictEqual(await ensureAccessToken(target), 'fresh')
  })

  test('ensureAccessToken returns the stored token when still valid', async () => {
    setHostCredentials(target.host, {
      clientId: 'client-1',
      refreshToken: 'r',
      accessToken: 'valid',
      expiresAt: Date.now() + 3_600_000,
    })
    assert.strictEqual(await ensureAccessToken(target), 'valid')
  })

  test('ensureAccessToken throws when not signed in', async () => {
    await assert.rejects(() => ensureAccessToken(target), /not_authenticated/)
  })
})
