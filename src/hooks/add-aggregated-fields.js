// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const getSalesAggregatedFields = async (itemId) => {
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
          salesQuantity: result[0].quantity ? result[0].quantity : 0,
          returnQuantity: result[0].returnQuantity ? result[0].returnQuantity : 0
        }
      }
      return {salesQuantity: 0, returnQuantity: 0}
    }

    const getInventoriesAggregatedFields = async (itemId) => {
      const result = await context.app.service('inventories').Model.aggregate([
        {$match: {'item': itemId}},
        {$group: {_id: null, inventoryQuantity: {$sum: '$quantity'}}}
      ])
      console.log(result)
      if (result[0]) {
        return {
          inventoryQuantity: result[0].inventoryQuantity ? result[0].inventoryQuantity : 0
        }
      }
      return {
        inventoryQuantity: 0
      }
    }

    const {result} = context
    if (result._id) {
      const {salesQuantity, returnQuantity} = await getSalesAggregatedFields(result._id)
      const {inventoryQuantity} = await getInventoriesAggregatedFields(result._id)
      context.result = {
        ...context.result,
        salesQuantity,
        returnQuantity,
        inventoryQuantity
      }
    } else if (result.data && result.data.length > 0) {
      const {data: items} = result
      const aggregatedItems = []
      for (let item of items) {
        const {salesQuantity, returnQuantity} = await getSalesAggregatedFields(item._id)
        const {inventoryQuantity} = await getInventoriesAggregatedFields(item._id)
        aggregatedItems.push({
          ...item,
          salesQuantity, returnQuantity, inventoryQuantity
        })
      }
      context.result.data = aggregatedItems
    }
    return context
  }
}
