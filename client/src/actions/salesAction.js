import client from '../common/client'
import { reset } from 'redux-form'

export const GET_CUSTOMERS = 'GET_CUSTOMERS'

export const ADD_SALE = 'ADD_SALE'
export const RECEIVE_SALES = 'RECEIVE_SALES'
export const RECEIVE_SALE = 'RECEIVE_SALE'
export const REMOVE_SALE = 'REMOVE_SALE'

// BASIC CRUD

// CREATE SALE
export const addSale = (sale) => {
  return async (dispatch) => {
    try {
      const newSale = await client.service('sales').create(sale)
      if (newSale) {
        dispatch(reset('saleForm'))
      }
    } catch (e) {
      console.log('ERROR - addSale() - salesAction.js', e)
    }
  }
}

// READ SALE(S)
export const getSales = () => {
  return async (dispatch) => {
    const sales = await client.service('sales').find({})
    dispatch({
      type: RECEIVE_SALES,
      payload: sales.data
    })
  }
}

// UPDATE SALE
export const removeSale = (id) => {
  return async (dispatch) => {
    await client.service('sales').remove(id)
    dispatch({
      type: REMOVE_SALE,
      payload: id
    })
  }
}
