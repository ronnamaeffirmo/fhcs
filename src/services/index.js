const users = require('./users/users.service.js')
const item = require('./item/item.service.js')
const sales = require('./sales/sales.service.js');
const customers = require('./customers/customers.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(item)
  app.configure(sales);
  app.configure(customers);
}
