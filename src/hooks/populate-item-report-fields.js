// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mongoose = require('mongoose')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const id = context.id
    const result = await context.app.service('items').Model.aggregate([
      {$match: {'_id': new mongoose.mongo.ObjectId(id)}},
      {$lookup: {from: 'sales', localField: '_id', foreignField: 'items.item', as: 'sales'}}
    ])
    context.result.sales = result[0].sales
    context.result.inventories = result[0].inventories
    return context
  }
}
