// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {path, method} = context
    const {user} = context.params
    if (!context.params.provider || path === 'authentication') {
      // internal calls (calls made by the server -- context.app.service() ...)
      return context
    } else if (method === 'get' && path === 'users' &&
      context.id && context.params.user._id &&
      context.id.toString() === context.params.user._id.toString()) {
      // allow logged in users to get their own data
      return context
    } else if (!user && context.params.provider) {
      throw new Error('You are not logged in!')
    } else {
      const {role} = await context.app.service('users').get(context.params.user._id)
      const {permissions} = await context.app.service('roles').get(role)
      let authorized = false
      for (const permission of permissions) {
        const userService = permission.split(':')[0]
        const userServicePermission = permission.split(':')[1]
        if (userService.toLowerCase() === path.toLowerCase()) {
          if (userServicePermission.toLowerCase() === method ||
            userServicePermission.toLowerCase() === 'all') {
            authorized = true
          }
        }
      }
      if (!authorized) {
        throw new Error(`You can't do this. Please contact your administrator to elevate your permissions!`)
      }
    }
    return context
  }
}
