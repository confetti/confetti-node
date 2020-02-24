const BufferStream = require('q-io/buffer-stream')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(chaiAsPromised)
chai.use(sinonChai)

var http = {
  request() {
    return {
      status: 200,
      body: BufferStream(new Buffer('Success')),
      headers: {}
    }
  }
}

const httpMock = data => {
  if (http.request.returns == undefined) {
    sinon.stub(http, 'request')
  }

  http.request.returns({
    status: 200,
    body: BufferStream(new Buffer(JSON.stringify(data))),
    headers: {
      'content-type': 'application/json'
    }
  })
}

module.exports = {
  expect: chai.expect,
  sinon,
  http,
  httpMock
}
