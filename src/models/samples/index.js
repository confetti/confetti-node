module.exports = function() {
  const getSample = model => {
    const raw = require(`./${model}/raw`)
    const formatted = require(`./${model}/formatted`)
    const rawMultiple = { data: [raw.data, raw.data] }
    const formattedMultiple = [formatted, formatted]
    return {
      single: {
        formatted: formatted,
        raw: raw
      },
      multiple: {
        formatted: formattedMultiple,
        raw: rawMultiple
      }
    }
  }

  const models = [
    'category',
    'event',
    'image',
    'payment',
    'ticket',
    'webhook',
    'workspace'
  ]

  return models.reduce((result, key) => {
    result[key] = getSample(key)
    return result
  }, {})
}
