const samples = require('./samples')()

module.exports = {
  category: require('./category')({ samples }),
  event: require('./event')({ samples }),
  image: require('./image')({ samples }),
  payment: require('./payment')({ samples }),
  ticket: require('./ticket')({ samples }),
  webhook: require('./webhook')({ samples }),
  workspace: require('./workspace')({ samples })
}
