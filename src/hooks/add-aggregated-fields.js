// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mongoose = require('mongoose')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const getAggregatedFields = async (itemId) => {
      const result = await context.app.service('sales').Model.aggregate(
        [
          {$match: {'items.item': itemId}},
          {$unwind: '$items'},
          {$match: {'items.item': itemId}},
          {
            $group: {
              _id: null,
              'quantity': {$sum: '$items.quantity'},
              'returnQuantity': {$sum: '$items.return'}
            }
          }
        ]
      )
      if (result[0]) {
        return {
          quantity: result[0].quantity ? result[0].quantity : 0,
          returnQuantity: result[0].returnQuantity ? result[0].returnQuantity : 0
        }
      }
      return {quantity: 0, returnQuantity: 0}
    }
    const {result} = context
    if (result._id) {
      const {quantity, returnQuantity} = await getAggregatedFields(result._id)
      context.result = {
        ...context.result,
        quantity,
        returnQuantity
      }
    } else if (result.data && result.data.length > 0) {
      const {data: items} = result
      const aggregatedItems = []
      for (let item of items) {
        const {quantity, returnQuantity} = await getAggregatedFields(item._id)
        aggregatedItems.push({
          ...item,
          quantity, returnQuantity
        })
      }
      context.result.data = aggregatedItems
    }
    return context
  }
}
