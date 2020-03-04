const url = require('url')
const qs = require('qs')

const { Store } = require('yayson')()
const store = new Store()

const API_HOST = process.env.API_HOST || 'api.confetti.events'
const API_PROTOCOL = process.env.API_PROTOCOL || 'https'

module.exports = function({ apiKey, fetch }) {
  if (!fetch) {
    fetch = require('node-fetch')
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
    const fetchUrl = url.format({
      host: API_HOST,
      protocol: API_PROTOCOL,
      pathname: path,
      search: qs.stringify({ filter, sort, page })
    })

    if (json) {
      httpOptions.body = JSON.stringify(json)
    }
    const res = await fetch(fetchUrl, httpOptions)

    if (res.headers.get('content-type') == 'application/json') {
      const body = await res.json()
      if (raw) {
        return body
      } else {
        return store.sync(body)
      }
    } else {
      return await res.text()
    }
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
