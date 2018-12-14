const {authenticate} = require('@feathersjs/authentication').hooks
const mongoose = require('mongoose')

const checkItemUsage = require('../../hooks/check-item-usage');

// const validateReturnQuantity = (hook) => {
// const prop = hook.type === 'before' ? 'data' : 'result';
// const dataHook = hook;
//   if (hook.type == 'before') {
//     const { data } = hook
//     console.log(data)
//     //do something
//   }
//   else {
//     Promise.reject(new Error('before hook only.'))
//   }
// }

module.exports = {
  before: {
    // all: [ authenticate('jwt') ], //
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [checkItemUsage()]
  },

  after: {
    all: [],
    find: [async (context) => {
      const {params: {query: {itemId}}, app} = context
      if (itemId) {
        id = new mongoose.mongo.ObjectId(itemId)
        const sales = await app.service('sales').Model.aggregate(
          [
            {$match: {'items.item': new mongoose.mongo.ObjectId(id)}},
            {$unwind: '$items'},
            {$match: {'items.item': new mongoose.mongo.ObjectId(id)}},
            {$lookup: {from: 'customers', localField: 'customer', foreignField: '_id', as: 'customer'}},
            {$unwind: '$customer'},
            {
              $project: {
                officialReceipt: '$officialReceipt',
                customer: '$customer',
                date: '$date',
                quantity: '$items.quantity',
                returnQuantity: '$items.returnQuantity'
              }
            }
          ]
        )
        context.result.sales = sales
      }
      return context
    }],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
