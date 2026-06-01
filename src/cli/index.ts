#!/usr/bin/env node
import { parseArgs } from 'node:util'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import Confetti from '../index.js'
import { authLogin, authLogout, authStatus } from './commands/auth.js'
import { dispatch, UsageError } from './commands/resource.js'
import { ensureAccessToken, refresh, type HostTarget } from './oauth.js'

const HELP = `confetti — command-line client for the Confetti API

Usage:
  confetti auth login                 Sign in via your browser (OAuth)
  confetti auth logout                Revoke the session and remove local tokens
  confetti auth status                Show the current session for a host

  confetti <resource> <method> [id]   Call an SDK method, e.g.:
    confetti events findAll -o '{"filter":{"limit":10}}'
    confetti events find 1 -o '{"include":"workspace"}'
    confetti contacts create -d '{"email":"a@b.com"}'
    confetti events update 1 -d '{"name":"New name"}'
    confetti webhooks delete 7

Methods map 1:1 onto the SDK: findAll, find, create, update, delete (only those
a resource actually supports).

Flags:
  -d, --data <json>       JSON body for create/update
      --data-file <path>  Read the JSON body from a file
  -o, --options <json>    JSON options passed to the SDK method (filter/include/sort/page)
      --host <host>        API host (default: $CONFETTI_API_HOST or api.confetti.events)
      --protocol <proto>   http|https (default: $CONFETTI_API_PROTOCOL or https)
      --api-key <key>      Use an API key instead of the stored OAuth token
      --no-browser         Print the authorize URL instead of opening a browser
  -h, --help               Show this help
      --version            Show the package version
`

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    host: { type: 'string' },
    protocol: { type: 'string' },
    'api-key': { type: 'string' },
    data: { type: 'string', short: 'd' },
    'data-file': { type: 'string' },
    options: { type: 'string', short: 'o' },
    'no-browser': { type: 'boolean' },
    help: { type: 'boolean', short: 'h' },
    version: { type: 'boolean' },
  },
})

function resolveTarget(): HostTarget {
  const host =
    (typeof values.host === 'string' && values.host) || process.env['CONFETTI_API_HOST'] || 'api.confetti.events'
  const protocol =
    (typeof values.protocol === 'string' && values.protocol) || process.env['CONFETTI_API_PROTOCOL'] || 'https'
  return { host, protocol }
}

function readBody(): unknown {
  if (typeof values['data-file'] === 'string') return JSON.parse(readFileSync(values['data-file'], 'utf8'))
  if (typeof values.data === 'string') return JSON.parse(values.data)
  return undefined
}

function readOptions(): unknown {
  if (typeof values.options === 'string') return JSON.parse(values.options)
  return {}
}

function version(): string {
  try {
    const pkgPath = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'package.json')
    const pkg: unknown = JSON.parse(readFileSync(pkgPath, 'utf8'))
    if (typeof pkg === 'object' && pkg !== null) {
      const value: unknown = Reflect.get(pkg, 'version')
      if (typeof value === 'string') return value
    }
  } catch {
    // fall through
  }
  return 'unknown'
}

function printResult(result: unknown): void {
  if (result === undefined || result === null) return
  console.log(JSON.stringify(result, null, 2))
}

function isUnauthorized(err: unknown): boolean {
  return err instanceof Error && /\b401\b|unauthorized/i.test(err.message)
}

async function runAuth(sub: string | undefined, target: HostTarget): Promise<void> {
  if (sub === 'login') return authLogin(target, { openBrowser: values['no-browser'] !== true })
  if (sub === 'logout') return authLogout(target)
  if (sub === 'status') return Promise.resolve(authStatus(target))
  throw new UsageError(`Unknown auth command '${sub ?? ''}'. Use: login | logout | status`)
}

async function runResource(resource: string, method: string | undefined, id: string | undefined): Promise<void> {
  if (!method) throw new UsageError(`Usage: confetti ${resource} <findAll|find|create|update|delete> [id]`)

  const target = resolveTarget()
  const apiKey = typeof values['api-key'] === 'string' ? values['api-key'] : undefined
  const body = readBody()
  const options = readOptions()

  const buildClient = (credentials: { apiKey?: string; accessToken?: string }): Confetti =>
    new Confetti({ ...credentials, apiHost: target.host, apiProtocol: target.protocol })

  if (apiKey) {
    printResult(await dispatch({ client: buildClient({ apiKey }), resource, method, id, body, options }))
    return
  }

  const accessToken = await ensureAccessToken(target)
  try {
    printResult(await dispatch({ client: buildClient({ accessToken }), resource, method, id, body, options }))
  } catch (err) {
    if (!isUnauthorized(err)) throw err
    // Access token rejected mid-flight — refresh once and retry.
    const refreshed = await refresh(target)
    printResult(
      await dispatch({ client: buildClient({ accessToken: refreshed.accessToken }), resource, method, id, body, options }),
    )
  }
}

async function main(): Promise<void> {
  if (values.version) {
    console.log(version())
    return
  }

  const [first, second, third] = positionals
  if (!first || values.help) {
    console.log(HELP)
    return
  }

  if (first === 'auth') {
    await runAuth(second, resolveTarget())
    return
  }

  await runResource(first, second, third)
}

main().catch((err: unknown) => {
  process.exitCode = 1
  if (err instanceof UsageError) {
    console.error(err.message)
    return
  }
  if (err instanceof Error) {
    if (err.message === 'not_authenticated') {
      console.error('Not signed in. Run: confetti auth login')
      return
    }
    console.error(`Error: ${err.message}`)
    const fields: unknown = Reflect.get(err, 'fields')
    if (fields && typeof fields === 'object') console.error(JSON.stringify(fields, null, 2))
    return
  }
  console.error('Unknown error')
})
