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
        adapter: adapter({ apiKey: settings.key, fetch: settings.fetch }),
        models
      })
    )
  }
}

Confetti.models = models

module.exports = Confetti
