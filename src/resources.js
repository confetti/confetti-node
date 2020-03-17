module.exports = function({ adapter, models }) {
  const createResource = resourceName => {
    return {
      findAll({
        filter,
        sort,
        page,
        raw,
        apiKey,
        fetch,
        apiHost,
        apiProtocol
      } = {}) {
        return adapter.get({
          path: resourceName,
          filter,
          sort,
          page,
          apiKey,
          fetch,
          apiHost,
          apiProtocol
        })
      },
      find(id, { raw, apiKey, fetch, apiHost, apiProtocol } = {}) {
        return adapter.get({
          path: `${resourceName}/${id}`,
          raw,
          apiKey,
          fetch,
          apiHost,
          apiProtocol
        })
      }
    }
  }

  const resources = ['events', 'payments', 'tickets', 'webhooks', 'workspaces']

  return resources.reduce((result, key) => {
    result[key] = createResource(key)
    return result
  }, {})
}
