const users = require('./users/users.service.js')
const items = require('./items/items.service.js')
const sales = require('./sales/sales.service.js')
const customers = require('./customers/customers.service.js')
const permissions = require('./permissions/permissions.service.js')
const roles = require('./roles/roles.service.js')
const inventories = require('./inventories/inventories.service.js')

module.exports = function (app) {
  app.configure(users)
  app.configure(items)
  app.configure(sales)
  app.configure(customers)
  app.configure(permissions)
  app.configure(roles)
  app.configure(inventories)
}
