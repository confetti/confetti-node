import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getHostCredentials, setHostCredentials, clearHostTokens } from '../../src/cli/storage.js'

describe('CLI storage', () => {
  let dir: string
  let previous: string | undefined

  beforeEach(() => {
    previous = process.env['XDG_CONFIG_HOME']
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'confetti-cli-'))
    process.env['XDG_CONFIG_HOME'] = dir
  })

  afterEach(() => {
    if (previous === undefined) delete process.env['XDG_CONFIG_HOME']
    else process.env['XDG_CONFIG_HOME'] = previous
    fs.rmSync(dir, { recursive: true, force: true })
  })

  test('stores and reads host credentials', () => {
    setHostCredentials('api.confetti.events', { accessToken: 'a', refreshToken: 'r', clientId: 'c' })
    const creds = getHostCredentials('api.confetti.events')
    assert.strictEqual(creds.accessToken, 'a')
    assert.strictEqual(creds.refreshToken, 'r')
    assert.strictEqual(creds.clientId, 'c')
  })

  test('writes the credentials file with 0600 permissions', () => {
    setHostCredentials('api.confetti.events', { accessToken: 'a' })
    const file = path.join(dir, 'confetti', 'credentials.json')
    assert.strictEqual(fs.statSync(file).mode & 0o777, 0o600)
  })

  test('merges updates into existing host credentials', () => {
    setHostCredentials('h', { clientId: 'c' })
    setHostCredentials('h', { accessToken: 'a' })
    const creds = getHostCredentials('h')
    assert.strictEqual(creds.clientId, 'c')
    assert.strictEqual(creds.accessToken, 'a')
  })

  test('clearHostTokens keeps the clientId and drops the tokens', () => {
    setHostCredentials('api.confetti.events', { accessToken: 'a', refreshToken: 'r', clientId: 'c' })
    clearHostTokens('api.confetti.events')
    const creds = getHostCredentials('api.confetti.events')
    assert.strictEqual(creds.accessToken, undefined)
    assert.strictEqual(creds.refreshToken, undefined)
    assert.strictEqual(creds.clientId, 'c')
  })

  test('returns an empty object for an unknown host', () => {
    assert.deepStrictEqual(getHostCredentials('missing.host'), {})
  })
})
