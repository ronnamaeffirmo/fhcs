import client from '../common/client'
import { toastError, toastSuccess } from './toasterActions'
import { toTitleCase } from '../common/helpers'
import { reset } from 'redux-form'

export const ADD_CUSTOMER = 'ADD_CUSTOMER'
export const GET_CUSTOMER = 'GET_CUSTOMER'
export const GET_CUSTOMERS = 'GET_CUSTOMERS'
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER'
export const REMOVE_CUSTOMER_ERROR = 'REMOVE_CUSTOMER_ERROR'
export const PATCH_CUSTOMER = 'PATCH_CUSTOMER'
export const FILTER_CUSTOMERS = 'FILTER_CUSTOMERS'

export const addCustomer = (data) => {
  return async (dispatch) => {
    try {
      const customer = await client.service('customers').create(data)
      if (customer) {
        dispatch({
          type: ADD_CUSTOMER,
          payload: customer
        })
        dispatch(reset('customerForm'))
        toastSuccess({message: `${toTitleCase(data.name)} has been created`})
      }

    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const filterCustomers = (value) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_CUSTOMERS,
      payload: value
    })
  }
}

export const getCustomer = (id) => {
  return async (dispatch) => {
    await dispatch(getCustomers())
    const customer = await client.service('customers').get(id)
    try {
      dispatch({
        type: GET_CUSTOMER,
        payload: customer
      })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const getCustomers = () => {
  return async (dispatch) => {
    try {
      const customers = await client.service('customers').find({})
      if (customers) {
        dispatch({
          type: GET_CUSTOMERS,
          payload: customers.data
        })
        toastSuccess({message: 'Customer list has been updated!'})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}
export const removeCustomer = (id) => async (dispatch) => {
  try {
    await client.service('customers').remove(id)
    dispatch({
      type: REMOVE_CUSTOMER,
      payload: id
    })
  } catch (e) {
    toastError({message: e.message})
  }
}

export const patchCustomer = (id, data) => async (dispatch) => {
  try {
    const patchCustomer = await client.service('customers').patch(id, {$set: data})
    dispatch({
      type: PATCH_CUSTOMER,
      payload: patchCustomer
    })
  } catch (e) {
    toastError({message: e.message})
  }
}
