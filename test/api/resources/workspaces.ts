import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Workspaces', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one workspace', async () => {
      const mockData = Confetti.models.workspace.sample.single.raw

      nock('https://api.confetti.events')
        .get('/workspaces/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.workspaces.find(1)

      assert.deepStrictEqual(data, Confetti.models.workspace.sample.single.formatted)
    })
    test('should request multiple workspaces', async () => {
      const mockData = Confetti.models.workspace.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/workspaces')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.workspaces.findAll()

      assert.deepStrictEqual(data, Confetti.models.workspace.sample.multiple.formatted)
    })
  })

  describe('Static', () => {
    test('should request one workspace', async () => {
      const mockData = Confetti.models.workspace.sample.single.raw

      nock('https://api.confetti.events')
        .get('/workspaces/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.workspaces.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.workspace.sample.single.formatted)
    })
    test('should request multiple workspaces', async () => {
      const mockData = Confetti.models.workspace.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/workspaces')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.workspaces.findAll({ apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.workspace.sample.multiple.formatted)
    })
  })
})

