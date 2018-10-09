const users = require('./users/users.service.js')
const item = require('./item/item.service.js')
const sales = require('./sales/sales.service.js');
const customers = require('./customers/customers.service.js');
const permissions = require('./permissions/permissions.service.js')
const roles = require('./roles/roles.service.js')
const inventories = require('./inventories/inventories.service.js');

module.exports = function (app) {
  app.configure(users)
  app.configure(item)
  app.configure(sales);
  app.configure(customers);
  app.configure(permissions)
  app.configure(roles)
  app.configure(inventories);
}


