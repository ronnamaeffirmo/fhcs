// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const users = await context.app.service('users').find({
      query: {
        'role': context.id
      }
    })
    if (users._id || users.data.length > 0) {
      throw new Error('This role is being used by one or more users and cannot be deleted!')
    }
    return context
  }
}
