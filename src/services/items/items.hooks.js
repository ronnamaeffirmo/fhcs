const search = require('feathers-mongodb-fuzzy-search')
const mongoose = require('mongoose')

const addAggregatedFields = require('../../hooks/add-aggregated-fields');

module.exports = {
  before: {
    all: [],
    find: [search({fields: ['name', 'description']})],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [addAggregatedFields()],
    get: [addAggregatedFields()],
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
