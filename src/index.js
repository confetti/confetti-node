const dotenv = require('dotenv')
dotenv.config()

const adapter = require('./adapter')
const resources = require('./resources')
const models = require('./models')

const request = {
  get(path) {},
  post(path) {},
  delete(path) {}
}

class Confetti {
  constructor(settings = {}) {
    Object.assign(
      this,
      resources({
        adapter: adapter({ apiKey: settings.key, http: settings.http }),
        models
      })
    )
  }
}

Confetti.models = models

module.exports = Confetti
