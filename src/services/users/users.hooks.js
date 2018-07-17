const local = require('@feathersjs/authentication-local')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [local.hooks.hashPassword({ passwordField: 'password' })],
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
