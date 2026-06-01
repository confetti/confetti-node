import { login, logout, type HostTarget } from '../oauth.js'
import { getHostCredentials } from '../storage.js'

export async function authLogin(target: HostTarget, options: { openBrowser: boolean }): Promise<void> {
  await login(target, options)
  console.log(`\n✓ Signed in to ${target.host}.`)
}

export async function authLogout(target: HostTarget): Promise<void> {
  await logout(target)
  console.log(`Signed out of ${target.host}.`)
}

export function authStatus(target: HostTarget): void {
  const creds = getHostCredentials(target.host)
  if (!creds.accessToken) {
    console.log(`Not signed in to ${target.host}. Run: confetti auth login`)
    return
  }

  const expired = typeof creds.expiresAt === 'number' && Date.now() >= creds.expiresAt
  const expiresAt = typeof creds.expiresAt === 'number' ? new Date(creds.expiresAt).toISOString() : 'unknown'

  console.log(`Signed in to ${target.host}`)
  console.log(`  scope:      ${creds.scope || 'unknown'}`)
  console.log(`  expires at: ${expiresAt}${expired ? ' (expired — refreshes on next call)' : ''}`)
  console.log(`  client id:  ${creds.clientId || 'unknown'}`)
}
