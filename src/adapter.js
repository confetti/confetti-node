const Q = require('q')
const url = require('url')
const qs = require('qs')
const zlib = require('zlib')

const { Store } = require('yayson')()
const store = new Store()

const API_HOST = process.env.API_HOST || 'api.confetti.events'
const API_PROTOCOL = process.env.API_PROTOCOL || 'https'

const softParseJSON = function(body, raw) {
  if (body.indexOf('{') !== 0) {
    return body
  }
  if (raw) {
    return JSON.parse(body)
  } else {
    return store.sync(JSON.parse(body))
  }
}

module.exports = function({ apiKey, http }) {
  if (!http) {
    http = require('q-io/http')
  }

  if (!apiKey) {
    throw new Error('missing_api_key')
  }

  const httpRequest = async function(method, options) {
    let { path, json, filter, sort, page, raw } = options

    const httpOptions = {
      method,
      timeout: method === 'get' ? 5000 : 15000,
      headers: {
        Authorization: `apikey ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip'
      }
    }
    httpOptions.url = url.format({
      host: API_HOST,
      protocol: API_PROTOCOL,
      pathname: path,
      search: qs.stringify({ filter, sort, page })
    })

    if (json) {
      httpOptions.body = [JSON.stringify(json)]
    }
    const res = await http.request(httpOptions)
    let body = await res.body.read()
    if (res.headers['content-encoding'] === 'gzip') {
      body = await Q.nfcall(zlib.gunzip, body)
    }
    return softParseJSON(body.toString(), raw)
  }

  const adapter = {
    async put(options) {
      return await httpRequest('put', options)
    },

    async post(options) {
      return await httpRequest('post', options)
    },

    async get(options) {
      return await httpRequest('get', options)
    },

    async delete(options) {
      return await httpRequest('delete', options)
    }
  }

  return adapter
}
