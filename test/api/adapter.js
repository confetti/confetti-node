const Confetti = require('../../src')
const { expect, http, sinon } = require('../helper')

describe('Adapter', function() {
  before(function() {
    sinon.spy(http, 'request')
  })
  after(function() {
    http.request.restore()
  })

  it('should make a find all request with correct url', async function() {
    const confetti = new Confetti({ key: 'my-key', http })
    await confetti.events.findAll({
      filter: { workspaceId: 10 },
      page: {
        limit: 1,
        offset: 10
      }
    })
    expect(http.request).to.have.been.calledWith({
      url:
        'https://api.confetti.events/' +
        encodeURI(
          'events?filter[workspaceId]=10&page[limit]=1&page[offset]=10'
        ),
      method: 'get',
      timeout: 5000,
      headers: {
        Authorization: 'apikey my-key',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip'
      }
    })
  })

  it('should make a find request with correct url', async function() {
    const confetti = new Confetti({ key: 'my-key', http })
    await confetti.events.find(3)
    expect(http.request).to.have.been.calledWith({
      url: 'https://api.confetti.events/events/3',
      method: 'get',
      timeout: 5000,
      headers: {
        Authorization: 'apikey my-key',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip'
      }
    })
  })
})
