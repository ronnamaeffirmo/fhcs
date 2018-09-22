import client from "../common/client";

export const ADD_SALES_RECORD = 'ADD_SALES_RECORD'

export const createSales = (values) => {
  return async (dispatch) => {
    const total = values.price * values.quantity
    Object.assign(values, { total: total.toFixed(2) })
    const salesRecord = await client.service('sales').create(values)
    window.alert('Added new Sales')

    dispatch({
        type: ADD_SALES_RECORD,
        payload: salesRecord
    })
  }
}
