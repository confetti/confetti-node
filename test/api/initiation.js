const Confetti = require('../../src')
const { expect } = require('../helper')

describe('Initiat', function() {
  it('should initiate a Confetti api instance', function() {
    new Confetti({ key: 'my-key' })
  })

  it('should fail to initiate a Confetti api instance due to missing api key', function() {
    expect(() => {
      new Confetti()
    }).to.throw('missing_api_key')
  })
})
