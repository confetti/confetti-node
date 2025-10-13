import * as chai from 'chai'
import * as sinon from 'sinon'

import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import fetchMock from 'fetch-mock'

chai.use(chaiAsPromised)
chai.use(sinonChai)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetch = fetchMock.sandbox() as any

export const expect = chai.expect
export { sinon, fetch }
