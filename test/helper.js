const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(chaiAsPromised)
chai.use(sinonChai)

fetchData = data => {
  return {
    status: 200,
    async json() {
      return data
    },
    headers: {
      get() {
        return 'application/json'
      }
    }
  }
}

module.exports = {
  expect: chai.expect,
  sinon,
  fetchData
}
