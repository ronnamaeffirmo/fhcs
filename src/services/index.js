const users = require('./users/users.service.js')
const items = require('./items/items.service.js')
const permissions = require('./permissions/permissions.service.js');
const roles = require('./roles/roles.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(items)
  app.configure(permissions);
  app.configure(roles);
}
