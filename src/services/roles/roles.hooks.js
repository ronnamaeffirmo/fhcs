const {authenticate} = require('@feathersjs/authentication').hooks

const validatePermissionDataRequest = (context) => {
  if (context.data.permissions) {
    const {permissions} = context.data
    const parsedPermissions = []
    if (permissions) {
      for (const permission of permissions) {
        let {service, param} = permission
        if (param === 'all') {
          parsedPermissions.push(service + ':' + 'all')
        } else if (param === 'create') {
          parsedPermissions.push(service + ':' + 'create')
        } else if (param === 'read') {
          parsedPermissions.push(service + ':' + 'get')
          parsedPermissions.push(service + ':' + 'find')
        } else if (param === 'update') {
          parsedPermissions.push(service + ':' + 'update')
          parsedPermissions.push(service + ':' + 'patch')
        } else if (param === 'delete') {
          parsedPermissions.push(service + ':' + 'remove')
        } else {
          console.log(`SERVICE: ${service} || PARAM: ${param}`)
          throw new Error('Permission array not recognized!')
        }
      }
    }
    context.data.title = (context.data.title).toLowerCase()
    context.data.permissions = parsedPermissions
  } else {
    throw new Error('A role must contain at least one permission!')
  }

}

const checkRoleUsage = require('../../hooks/check-role-usage');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validatePermissionDataRequest],
    update: [validatePermissionDataRequest],
    patch: [validatePermissionDataRequest],
    remove: [checkRoleUsage()]
  },

  after: {
    all: [(context) => {
      const processRolePermissions = (role) => {
        const permissions = []
        for (const permission of role.permissions) {
          const service = permission.split(':')[0]
          const method = permission.split(':')[1]
          switch (method) {
            case 'find':
            case 'get':
              permissions.push(service + ':' + 'read')
              break
            case 'create':
              permissions.push(service + ':' + 'create')
              break
            case 'update':
            case 'patch':
              permissions.push(service + ':' + 'update')
              break
            case 'remove':
              permissions.push(service + ':' + 'delete')
              break
            case 'all':
              permissions.push(service + ':' + 'all')
              break
            default:
              permissions.push(service + ':' + method)
          }
        }
        return permissions
      }
      if (context.result.data || context.result.permissions) {
        const role = context.result.permissions ? context.result : undefined
        if (!role) {
          const {data: roles} =  context.result
          for (const role of roles) {
            role.permissions = processRolePermissions(role)
          }
        } else {
          context.result.permissions = processRolePermissions(context.result)
        }
      }
      return context
    }
    ],
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
