import client from '../common/client'
import { reset } from 'redux-form'
import { toastError, toastSuccess } from './toasterActions'

export const GET_CUSTOMERS = 'GET_CUSTOMERS'

export const ADD_SALE = 'ADD_SALE'
export const RECEIVE_SALES = 'RECEIVE_SALES'
export const RECEIVE_SALE = 'RECEIVE_SALE'
export const REMOVE_SALE = 'REMOVE_SALE'
export const APPLY_SALE_PAYMENT = 'APPLY_SALE_PAYMENT'
export const RETURN_ITEM = 'RETURN_ITEM'
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

export const returnItem = (saleId, itemId, returnQuantity, quantity) => {
  return async (dispatch) => {
    // console.log('ID:', id)
    try {
      //patch service
    // const result = await client.service('sales').patch(id, payload)
      const qty = quantity - returnQuantity < 0 ? 0 : quantity - returnQuantity
      dispatch({
        type: RETURN_ITEM,
        payload: {saleId, returnQuantity: qty, itemId}
      })

    } catch(e) {
      console.log('ERROR - returnItem() - salesActions.js', e)
    }
  }
}

// READ SALE(S)
export const getSales = () => {
  return async (dispatch) => {
    const sales = await client.service('sales').find({
      query: {$populate: ['customer', 'items.item']}
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
        toastSuccess({message: 'Sales record successfully updated!'})
      }
    } catch (e) {
      console.log('ERROR - updateSale() - saleActions.js')
    }
  }
}

export const applySalePayment = (values) => {
  return async (dispatch) => {
    console.log('APPLYING PAYMENT')
    const {_id: id, payment, officialReceipt} = values
    try {
      let payload = {
        _id: id,
        payment
      }
      if (payment === 'paid') {
        payload = {
          ...payload,
          paymentDate: new Date()
        }
      }
      const result = await client.service('sales').patch(id, payload)
      if (result) {
        dispatch({
          type: APPLY_SALE_PAYMENT,
          payload: payload
        })
        toastSuccess({message: `Payment applied for ${JSON.stringify(officialReceipt)}!`})
      }
    } catch (e) {
      toastError({message: e.message})
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
