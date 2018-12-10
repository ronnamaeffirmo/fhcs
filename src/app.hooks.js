// Application hooks that run for every service
const log = require('./hooks/log')
const checkPermissions = require('./hooks/check-permissions');

module.exports = {
  before: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // find: [checkPermissions()],
    // get: [checkPermissions()],
    // create: [checkPermissions()],
    // update: [checkPermissions()],
    // patch: [checkPermissions()],
    // remove: [checkPermissions()]
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
