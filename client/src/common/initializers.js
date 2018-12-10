import { formValueSelector } from 'redux-form'

export const itemStateInitializer = (state, items) => {
  let initialItemsState = [{}]
  if (items && state.item.searchList) {
    initialItemsState = items.map(item => {
      return {
        item: state.item.searchList.filter(i => {
          return i._id === item.item
        })[0].name,
        price: parseFloat(item.price).toFixed(2),
        quantity: parseInt(item.quantity),
        discount: parseFloat(item.discount).toFixed(2),
        subtotal: (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2),
        total: ((parseFloat(item.price) * parseFloat(item.quantity)) - parseFloat(item.discount)).toFixed(2)
      }
    })
    return initialItemsState
  }
}

export const getSaleContainerState = (state) => {
  const selector = formValueSelector('saleForm')
  return {
    tmp: {
      item: selector(state, 'tmpItem'),
      price: selector(state, 'tmpPrice'),
      quantity: selector(state, 'tmpQuantity'),
      discount: selector(state, 'tmpDiscount'),
    },
    date: selector(state, 'date'),
    term: parseInt(selector(state, 'term')) ? parseInt(selector(state, 'term')) : 0,
    items: itemStateInitializer(state, selector(state, 'items')),
    customerSearchList: state.customer.customers && state.customer.customers.map(customer => ({
      key: customer._id,
      value: customer._id,
      text: customer.company ? customer.company : customer.name
    })),
    itemSearchList: state.item.searchList && state.item.searchList.map(item => {
      return {
        key: item._id,
        value: item._id,
        text: item.name,
        price: item.price
      }
    })
  }
}
