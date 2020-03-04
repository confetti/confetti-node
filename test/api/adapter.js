const Confetti = require('../../src')
const { expect, sinon, fetchData } = require('../helper')
let fetch

describe('Adapter', function() {
  before(function() {
    fetch = sinon.stub().returns(fetchData({}))
  })

  it('should make a find all request with correct url', async function() {
    const confetti = new Confetti({ key: 'my-key', fetch })
    await confetti.events.findAll({
      filter: { workspaceId: 10 },
      page: {
        limit: 1,
        offset: 10
      }
    })
    expect(fetch).to.have.been.calledWith(
      'https://api.confetti.events/' +
        encodeURI(
          'events?filter[workspaceId]=10&page[limit]=1&page[offset]=10'
        ),
      {
        method: 'get',
        timeout: 5000,
        headers: {
          Authorization: 'apikey my-key',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip'
        }
      }
    )
  })

  it('should make a find request with correct url', async function() {
    const confetti = new Confetti({ key: 'my-key', fetch })
    await confetti.events.find(3)
    expect(fetch).to.have.been.calledWith(
      'https://api.confetti.events/events/3',
      {
        method: 'get',
        timeout: 5000,
        headers: {
          Authorization: 'apikey my-key',
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip'
        }
      }
    )
  })
})
