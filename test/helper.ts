import * as sinon from 'sinon'
import fetchMock from 'fetch-mock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetch = fetchMock.sandbox() as any

export { sinon, fetch }
