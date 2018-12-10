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
      const {role: {permissions}} = await context.app.service('users').get(
        context.params.user._id,
        {
          query: {
            $populate: 'role'
          }
        })
      let authorized = false
      console.log(`METHOD -> ${method} PATH --> ${path}`)
      for (const permission of permissions) {
        const userService = permission.split(':')[0]
        const userServicePermission = permission.split(':')[1]
        if (userService.toLowerCase() === path.toLowerCase()) {
          // console.log(`  TRYING ${userService} === ${path} :: ${userServicePermission} === ${method}`)
          if (userServicePermission.toLowerCase() === method ||
            userServicePermission.toLowerCase() === 'all') {
            // console.log(`    PERMISSION GRANTED ON ${method} -> ${path}`)
            authorized = true
          }
        }
      }
      if (!authorized) {
        throw new Error(`Your account has insufficient permissions!`)
      }
    }
    return context
  }
}
