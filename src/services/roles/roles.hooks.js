const { authenticate } = require('@feathersjs/authentication').hooks

const validatePermissionDataRequest = (context) => {
  if (context.data.permissions) {
    const {permissions} = context.data
    const parsedPermissions = []
    if (permissions) {
      for (const permission of permissions) {
        const {service, params} = permission
        for (const param of params) {
          parsedPermissions.push(service + ':' + params)
        }
      }
    }
    context.data.permissions = parsedPermissions
  } else {
    throw new Error('A role must contain at least one permission!')
  }

}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validatePermissionDataRequest],
    update: [validatePermissionDataRequest],
    patch: [validatePermissionDataRequest],
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
