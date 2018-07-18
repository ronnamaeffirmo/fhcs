const users = require('./users/users.service.js')
const item = require('./item/item.service.js')
const permissions = require('./permissions/permissions.service.js');
const roles = require('./roles/roles.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(item)
  app.configure(permissions);
  app.configure(roles);
}
