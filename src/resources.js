module.exports = function({ adapter, models }) {
  const addFindAll = (resources, resourceName) => {
    resources[resourceName].findAll = ({
      filter,
      sort,
      page,
      raw,
      apiKey,
      fetch,
      apiHost,
      apiProtocol
    } = {}) => {
      return adapter.get({
        path: resourceName,
        filter,
        sort,
        page,
        apiKey,
        fetch,
        apiHost,
        apiProtocol,
        type: resourceName
      })
    }
  }
  const addFind = (resources, resourceName) => {
    resources[resourceName].find = (
      id,
      { raw, apiKey, fetch, apiHost, apiProtocol } = {}
    ) => {
      return adapter.get({
        path: `${resourceName}/${id}`,
        raw,
        apiKey,
        fetch,
        apiHost,
        apiProtocol,
        type: resourceName
      })
    }
  }
  const addCreate = (resources, resourceName) => {
    resources[resourceName].create = (
      json,
      { raw, apiKey, fetch, apiHost, apiProtocol } = {}
    ) => {
      return adapter.post({
        path: `${resourceName}`,
        raw,
        json,
        apiKey,
        fetch,
        apiHost,
        apiProtocol,
        type: resourceName
      })
    }
  }

  let resources = {}

  resources = [
    'events',
    'payments',
    'tickets',
    'webhooks',
    'workspaces'
  ].reduce((result, key) => {
    result[key] = {}
    addFindAll(result, key)
    addFind(result, key)
    return result
  }, resources)

  resources = ['webhooks'].reduce((result, key) => {
    addCreate(result, key)
    return result
  }, resources)

  return resources
}
