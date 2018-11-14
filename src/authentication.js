const auth = require('@feathersjs/authentication')
const jwt = require('@feathersjs/authentication-jwt')
const local = require('@feathersjs/authentication-local')

module.exports = function (app) {
  const authConfig = {
    'secret': '4984d53b9b0289e4d6ef9b262c4f9c41b4ee863582f415c41d59a4fd7ff6bed943b741df210d3989438aa76d!',
    'path': '/authentication',
    'service': 'users'
  }

  // Set up authentication with the secret
  app.configure(auth(authConfig))
  app.configure(jwt())
  app.configure(local({ usernameField: 'username', password: 'password', entity: 'user', service: 'users' }))

  // console.log(config.strategies)
  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)

  app.service('authentication').hooks({
    before: {
      create: [
        auth.hooks.authenticate(['jwt', 'local'])
      ],
      remove: [
        auth.hooks.authenticate('jwt')
      ]
    }
  })
}
