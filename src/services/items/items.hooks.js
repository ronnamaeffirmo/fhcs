const search = require('feathers-mongodb-fuzzy-search')

module.exports = {
  before: {
    all: [],
    find: [
      search({
        fields: ['name', 'description']
      })],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
