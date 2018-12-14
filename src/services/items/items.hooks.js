const search = require('feathers-mongodb-fuzzy-search')
const mongoose = require('mongoose')

const addAggregatedFields = require('../../hooks/add-aggregated-fields')
const checkItemUsage = require('../../hooks/check-item-usage')

const populateItemReportFields = require('../../hooks/populate-item-report-fields');

module.exports = {
  before: {
    all: [],
    find: [search({fields: ['name', 'description']})],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [checkItemUsage()]
  },

  after: {
    all: [],
    find: [addAggregatedFields()],
    get: [addAggregatedFields(), populateItemReportFields()],
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
