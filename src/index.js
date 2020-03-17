const dotenv = require('dotenv')
dotenv.config()

const adapter = require('./adapter')
const resources = require('./resources')
const models = require('./models')

class Confetti {
  constructor(settings = {}) {
    Object.assign(
      this,
      resources({
        adapter: adapter({
          apiKey: settings.apiKey,
          fetch: settings.fetch,
          apiHost: settings.host,
          apiProtocol: settings.protocol
        }),
        models
      })
    )
  }
}

Confetti.models = models

Object.assign(
  Confetti,
  resources({
    adapter: adapter(),
    models
  })
)

module.exports = Confetti
