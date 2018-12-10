import client from '../common/client'
import { reset } from 'redux-form'
import { toastError, toastSuccess } from './toasterActions'

export const ADD_SALE = 'ADD_SALE'
export const RECEIVE_SALES = 'RECEIVE_SALES'
export const RECEIVE_SALE = 'RECEIVE_SALE'
export const REMOVE_SALE = 'REMOVE_SALE'
export const APPLY_SALE_PAYMENT = 'APPLY_SALE_PAYMENT'
export const RETURN_ITEM = 'RETURN_ITEM'

export const addSale = (sale) => {
  return async (dispatch) => {
    try {
      const newSale = await client.service('sales').create(sale)
      if (newSale) {
        dispatch(reset('saleForm'))
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const returnItem = (data) => {
  return async (dispatch) => {
    try {
      const {saleId, itemId, items, returnQuantity} = data
      const result = items.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            returnQuantity
          }
        }
        else {
          return item
        }
      })
      const patch = await client.service('sales').patch(saleId, {
        $set: {
          items: result
        }
      })
      if (patch) {
        toastSuccess({message: 'New return count has been recorded!'})
        dispatch({type: RETURN_ITEM, payload: {saleId, returnQuantity, itemId}})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

// READ SALE(S)
export const getSales = () => {
  return async (dispatch) => {
    try {
      const sales = await client.service('sales').find({
        query: {$populate: ['customer', 'items.item']}
      })
      dispatch({
        type: RECEIVE_SALES,
        payload: sales.data
      })
    } catch (e) {
      toastError({message: e.message})
    }
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
      toastError({message: e.message})
    }
  }
}

export const updateSale = (values) => {
  console.log('values', values)
  return async (dispatch) => {
    console.log('UPDATING SALE WITH VALUES', values)
    const {_id: id} = values
    try {
      const updatedSale = await client.service('sales').patch(id, values)
      if (updatedSale) {
        toastSuccess({message: 'Sales record successfully updated!'})
      }
    } catch (e) {
      toastError({message: e.message})
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
      toastError({message: e.message})
    }
  }
}
