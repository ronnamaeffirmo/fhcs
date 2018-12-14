// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // console.log(context.id)
    const sales = await context.app.service('sales').find({
      query: {
        'items.item': context.id
      }
    })
    const inventories = await context.app.service('inventories').find({
      query: {
        'item': context.id
      }
    })
    if (sales._id || sales.data.length > 0) {
      throw new Error('This item is used in some sale records and cannot be deleted.')
    } else if (inventories._id || inventories.data.length > 0) {
      throw new Error('This item is used in some inventory records and cannot be deleted.')
    }
    return context
  }
}
