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
      console.log('ERROR - addSale() - salesActions.js', e)
    }
  }
}

// READ SALE(S)
export const getSales = () => {
  return async (dispatch) => {
    const sales = await client.service('sales').find({
      query: { $populate: ['customer', 'items.item'] }
    })
    dispatch({
      type: RECEIVE_SALES,
      payload: sales.data
    })
  }
}

export const getSale = (id) => {
  return async (dispatch) => {
    try {
      console.log('SALE ID', id)
      const sale = await client.service('sales').get(id)
      console.log('RECEIVING SALE', sale)
      dispatch({
        type: RECEIVE_SALE,
        payload: sale
      })
    } catch (e) {
      console.log('ERROR on getSale() - saleActions.js', e)
    }
  }
}

// UPDATE SALE
export const updateSale = (values) => {
  return async (dispatch) => {
    console.log('UPDATING SALE WITH VALUES', values)
    const {_id: id} = values
    try {
      const updatedSale = await client.service('sales').patch(id, values)
      if (updatedSale) {
        window.alert('SALE UPDATED!')
      }
    } catch (e) {
      console.log('ERROR - updateSale() - saleActions.js')
    }
  }
}


export const removeSale = (id) => {
  return async (dispatch) => {
    try {
      const deletedSale = await client.service('sales').remove(id)
      if (deletedSale) {
        dispatch({
          type: REMOVE_SALE,
          payload: id
        })
      }
    } catch (e) {
      console.log('ERROR - removeSale() - saleActions.js', e)
    }
  }
}
