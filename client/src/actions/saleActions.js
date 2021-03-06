import client from '../common/client'
import { reset } from 'redux-form'
import { toastError, toastSuccess, toastInfo } from './toasterActions'

export const RECEIVE_SALES = 'RECEIVE_SALES'
export const RECEIVE_SALE = 'RECEIVE_SALE'
export const REMOVE_SALE = 'REMOVE_SALE'
export const APPLY_SALE_PAYMENT = 'APPLY_SALE_PAYMENT'
export const RETURN_ITEM = 'RETURN_ITEM'
export const START_SALES_LOADING = 'START_SALES_LOADING'
export const FINISH_SALES_LOADING = 'FINISH_SALES_LOADING'
export const FILTER_SALES = 'FILTER_SALES'

export const filterSales = (value) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_SALES,
      payload: value
    })
  }
}

export const addSale = (sale) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_SALES_LOADING })
      const newSale = await client.service('sales').create(sale)
      if (newSale) {
        dispatch(reset('saleForm'))
        dispatch({ type: FINISH_SALES_LOADING })
        toastSuccess({message: 'Sale successfully saved!'})
      }
    } catch (e) {
      dispatch({ type: FINISH_SALES_LOADING })
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
        dispatch({type: RETURN_ITEM, payload: {saleId, returnQuantity, itemId}})
        toastSuccess({message: 'New return count has been recorded!'})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

// READ SALE(S)
export const getSales = (customer) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_SALES_LOADING })
      let sales
      if (customer) {
        sales = await client.service('sales').find({
          query: {
            customer,
            $populate: ['customer', 'items.item']
          }
        })
      } else {
        sales = await client.service('sales').find({
          query: {$populate: ['customer', 'items.item']}
        })
      }

      if (sales) {
        dispatch({
          type: RECEIVE_SALES,
          payload: sales.data
        })
        toastSuccess({message: 'Sales records successfully fetched!'})
      }
      dispatch({ type: FINISH_SALES_LOADING })
    } catch (e) {
      dispatch({ type: FINISH_SALES_LOADING })
      toastError({message: e.message})
    }
  }
}

export const getSale = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_SALES_LOADING })
      const sale = await client.service('sales').get(id)
      if (sale) {
        dispatch({
          type: RECEIVE_SALE,
          payload: sale
        })
        dispatch({ type: FINISH_SALES_LOADING })
        toastSuccess({message: 'Sales record has been fetched successfully!'})

      }
    } catch (e) {
      dispatch({ type: FINISH_SALES_LOADING })
      toastError({message: e.message})
    }
  }
}

export const updateSale = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_SALES_LOADING })
      const {_id: id} = values
      const updatedSale = await client.service('sales').patch(id, values)
      if (updatedSale) {
        dispatch({ type: FINISH_SALES_LOADING })
        toastSuccess({message: 'Sales record successfully updated!'})
      }
    } catch (e) {
      dispatch({ type: FINISH_SALES_LOADING })
      toastError({message: e.message})
    }
  }
}

export const applySalePayment = (values) => {
  return async (dispatch) => {
    const {_id: id, status, officialReceipt} = values
    try {
      let payload = {
        _id: id,
        status
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
      toastInfo({ message: 'Removing sales record...' })
      const deletedSale = await client.service('sales').remove(id)
      if (deletedSale) {
        dispatch({
          type: REMOVE_SALE,
          payload: id
        })
        toastSuccess({message: 'Sales record has been successfully removed!'})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}
