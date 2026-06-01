import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

export interface HostCredentials {
  clientId?: string
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
  scope?: string
  tokenType?: string
}

interface CredentialStore {
  version: number
  hosts: Record<string, HostCredentials>
}

const STORE_VERSION = 1

function configDir(): string {
  const base = process.env['XDG_CONFIG_HOME'] || path.join(os.homedir(), '.config')
  return path.join(base, 'confetti')
}

function credentialsPath(): string {
  return path.join(configDir(), 'credentials.json')
}

function isCredentialStore(value: unknown): value is CredentialStore {
  if (typeof value !== 'object' || value === null) return false
  const hosts: unknown = Reflect.get(value, 'hosts')
  return typeof hosts === 'object' && hosts !== null
}

function readStore(): CredentialStore {
  const file = credentialsPath()
  if (!fs.existsSync(file)) {
    return { version: STORE_VERSION, hosts: {} }
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (isCredentialStore(parsed)) return parsed
  } catch {
    // A corrupt file should not wedge the CLI — start from an empty store.
  }
  return { version: STORE_VERSION, hosts: {} }
}

function writeStore(store: CredentialStore): void {
  const dir = configDir()
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 })
  const file = credentialsPath()
  const tmp = path.join(dir, `credentials.${process.pid}.tmp`)
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2), { mode: 0o600 })
  fs.renameSync(tmp, file)
  // Enforce 0600 even when the destination pre-existed with looser bits.
  fs.chmodSync(file, 0o600)
}

export function getHostCredentials(host: string): HostCredentials {
  return readStore().hosts[host] || {}
}

export function setHostCredentials(host: string, credentials: HostCredentials): void {
  const store = readStore()
  store.hosts[host] = { ...store.hosts[host], ...credentials }
  writeStore(store)
}

// Drop the session tokens but keep the registered clientId so logout/expiry
// doesn't force a re-registration on the next login.
export function clearHostTokens(host: string): void {
  const store = readStore()
  const existing = store.hosts[host]
  if (!existing) return
  store.hosts[host] = { clientId: existing.clientId }
  writeStore(store)
}
