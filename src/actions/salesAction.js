import client from '../common/client'
import moment from 'moment'
import Fuse from 'fuse.js'

export const GET_CUSTOMERS = 'GET_CUSTOMERS'
export const ON_CUSTOMER_DROPDOWN_CHANGE = 'ON_CUSTOMER_DROPDOWN_CHANGE'
export const ON_INVOICE_NUMBER_CHANGE = 'ON_INVOICE_NUMBER_CHANGE'
export const ON_CALENDAR_DATE_CHANGE = 'ON_CALENDAR_DATE_CHANGE'
export const ON_NET_TERMS_CHANGE = 'ON_NET_TERMS_CHANGE'
export const COMPUTE_DATE_TO = 'COMPUTE_DATE_TO'
export const ON_REMARKS_CHANGE = 'ON_REMARKS_CHANGE'
export const ON_ITEM_SEARCH = 'ON_ITEM_SEARCH'
export const ON_ITEM_SEARCH_RESULT = 'ON_ITEM_SEARCH_RESULT'
export const ON_SELECT_SEARCH_RESULT = 'ON_SELECT_SEARCH_RESULT'
export const ON_POPULATE = 'ON_POPULATE'
export const ON_PRICE_CHANGE = 'ON_PRICE_CHANGE'
export const ON_DISCOUNT_CHANGE = 'ON_DISCOUNT_CHANGE'
export const ON_QUANTITY_CHANGE = 'ON_QUANTITY_CHANGE'
export const BUTTON_ADD_ITEM = 'BUTTON_ADD_ITEM'
export const CREATE_SALES_RECORD = 'CREATE_SALES_RECORD'
export const CANCEL_BUTTON = 'CANCEL_BUTTON'
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST'
export const GET_SALES = 'GET_SALES'
export const REMOVE_SALE = 'REMOVE_SALE'

export const onCustomerDropdownChange = (customer) => {
  // console.log(customer)
  return (dispatch) => {
    dispatch({
      type: ON_CUSTOMER_DROPDOWN_CHANGE,
      payload: customer
    })
  }
}

export const removeSale = (id) => {
  return async (dispatch) => {
    await client.service('sales').remove(id)
    dispatch({
      type: REMOVE_SALE,
      payload: id
    })
  }
}

export const cancelButton = () => {
  return (dispatch) => {
    dispatch({
      type: CANCEL_BUTTON,
      payload: {
        customer: undefined,
        invoiceNumber: undefined,
        dateFrom: undefined,
        terms: undefined,
        dateTo: undefined,
        remarks: undefined,
        discount: undefined,
        itemLists: [],
        searchValue: undefined,
        price: undefined
      }
    })
  }
}

export const getSales = () => {
  return async (dispatch) => {
    const sales = await client.service('sales').find({})
    dispatch({
      type: GET_SALES,
      payload: sales.data
    })
  }
}

export const buttoAddItem = (item, price, quantity, discount) => {
  item.price = price === undefined ? 0 : price
  item.quantity = quantity === undefined ? 0 : quantity
  item.discount = discount === undefined ? 0 : discount
  const subTotal = price && quantity === undefined ? 0 : price * quantity
  const total = item.discount > subTotal ? 0 : subTotal - item.discount
  item.subtotal = subTotal
  item.total = total
  // console.log(item)
  return (dispatch) => {
    dispatch({
      type: BUTTON_ADD_ITEM,
      payload: item
    })
  }
}

export const onQuantityChange = (quantity) => {
  return (dispatch) => {
    dispatch({
      type: ON_QUANTITY_CHANGE,
      payload: quantity
    })
  }
}

export const onPriceChange = (price) => {
  return (dispatch) => {
    dispatch({
      type: ON_PRICE_CHANGE,
      payload: price
    })
  }
}

export const onDiscountChange = (discount) => {
  return (dispatch) => {
    dispatch({
      type: ON_DISCOUNT_CHANGE,
      payload: discount
    })
  }
}

export const onSelectSearchResult = (result) => {
  return (dispatch) => {
    dispatch(onPopulate(result.price, result.name))
    dispatch({
      type: ON_SELECT_SEARCH_RESULT,
      payload: result
    })
  }
}

export const createSalesRecord = (data) => {
  console.log(data)
  return async (dispatch) => {
    const sales = await client.service('sales').create(data)
    console.log('[!] item', sales)
    window.alert('Added new sale!')
    dispatch({
      type: CREATE_SALES_RECORD,
      payload: sales
    })
  }
}

export const removeFromList = (list, item) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_LIST,
      payload: item._id
    })
  }
}

export const onPopulate = (price, searchValue) => {
  // console.log(price)
  // console.log(searchValue)
  return (dispatch) => {
    dispatch({
      type: ON_POPULATE,
      payload: { price, searchValue }
    })
  }
}

export const onItemSearch = (searchValue, options, list) => {
  return (dispatch) => {
    dispatch(onItemSearchResults(searchValue, options, list))
    dispatch({
      type: ON_ITEM_SEARCH,
      payload: searchValue
    })
  }
}

export const onItemSearchResults = (searchValue, options, list) => {
  // console.log('List: ', list)
  // console.log('OPTIONS: ', options)
  // console.log('SearchValue: ', searchValue)
  let itemSearchResult = []
  const fuse = new Fuse(list, options)
  itemSearchResult = fuse.search(searchValue)

  // convert price, quantity to String, semantic-ui-react <Search/> requirement
  itemSearchResult = itemSearchResult.map(res =>
    Object.assign({}, res, {
      title: res.name,
      price: res.price.toString(),
      quantity: res.quantity.toString(),
      key: res._id
    })
  )

  // convert updatedAt and createdAt to lowerCaseString, semantic-ui-react <Search/> requirement
  itemSearchResult = itemSearchResult.map(res => {
    return renameProp('updatedAt', 'updateat', res)
  })

  itemSearchResult = itemSearchResult.map(res => {
    return renameProp('createdAt', 'createdat', res)
  })

  // console.log(itemSearchResult)
  return (dispatch) => {
    dispatch({
      type: ON_ITEM_SEARCH_RESULT,
      payload: itemSearchResult
    })
  }
}

export const getCustomers = () => {
  return async (dispatch) => {
    const customers = await client.service('customers').find()
    const result = customers.data.map(cus => Object.assign({}, cus,
      { name: cus.firstname + ' ' + cus.lastname,
        value: cus.firstname + ' ' + cus.lastname,
        text: cus.firstname + ' ' + cus.lastname
      })
    )
    dispatch({
      type: GET_CUSTOMERS,
      payload: result
    })
  }
}

export const onRemarksChange = (remarks) => {
  return (dispatch) => {
    dispatch({
      type: ON_REMARKS_CHANGE,
      payload: remarks
    })
  }
}

export const onInvoiceNumberChange = (value) => {
  // console.log(value)
  return (dispatch) => {
    dispatch({
      type: ON_INVOICE_NUMBER_CHANGE,
      payload: value
    })
  }
}

export const onCalendarDateChange = (dateFrom, netValue) => {
  // console.log(netValue)
  return (dispatch) => {
    if (dateFrom !== undefined && netValue !== undefined) {
      dispatch(computeDateTo(dateFrom, netValue))
    }
    dispatch({
      type: ON_CALENDAR_DATE_CHANGE,
      payload: dateFrom
    })
  }
}

export const onNetTermsChange = (dateFrom, netValue) => {
  // console.log(dateFrom)
  // console.log(netValue)
  return (dispatch) => {
    if (dateFrom !== undefined && netValue !== undefined) {
      dispatch(computeDateTo(dateFrom, netValue))
    }
    dispatch({
      type: ON_NET_TERMS_CHANGE,
      payload: netValue
    })
  }
}

export const computeDateTo = (dateFrom, days) => {
  const momentDate1 = moment(dateFrom, 'MM/DD/YYYY')
  const result = momentDate1.add(days, 'days').calendar()
  // console.log(result)
  return (dispatch) => {
    dispatch({
      type: COMPUTE_DATE_TO,
      payload: result
    })
  }
}

// function in renaming objectKeys
const renameProp = (
  oldProp,
  newProp,
  { [oldProp]: old, ...others }
) => {
  return {
    [newProp]: old,
    ...others
  }
}
