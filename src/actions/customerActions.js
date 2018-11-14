import client from '../common/client'

export const ADD_CUSTOMER = 'ADD_CUSTOMER'

export const addCustomer = (data) => {
  return async (dispatch) => {
    const customer = await client.service('customers').create(data)
    console.log('[!] item', customer)
    window.alert('Added new customer!')
    dispatch({
      type: ADD_CUSTOMER,
      payload: data
    })
  }
}
