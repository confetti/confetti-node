module.exports = function({ adapter, models }) {
  const createResource = resourceName => {
    return {
      findAll({ filter, sort, page, raw } = {}) {
        return adapter.get({
          path: resourceName,
          filter,
          sort,
          page
        })
      },
      find(id, { raw } = {}) {
        return adapter.get({ path: `${resourceName}/${id}`, raw })
      }
    }
  }

  const resources = ['events', 'payments', 'tickets', 'webhooks', 'workspaces']

  return resources.reduce((result, key) => {
    result[key] = createResource(key)
    return result
  }, {})
}
