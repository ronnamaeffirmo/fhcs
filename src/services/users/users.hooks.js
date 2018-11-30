const local = require('@feathersjs/authentication-local')

module.exports = {
  before: {
    all: [(context) => {console.log(context.params)}],
    find: [],
    get: [],
    create: [local.hooks.hashPassword({ passwordField: 'password' })],
    update: [],
    patch: [local.hooks.hashPassword({ passwordField: 'password' })],
    remove: []
  },

  after: {
    all: [local.hooks.protect('password')],
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
