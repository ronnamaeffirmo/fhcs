import client from '../common/client'
import { toastError, toastSuccess, toastInfo } from './toasterActions'
import { toTitleCase } from '../common/helpers'
import { reset } from 'redux-form'

export const ADD_CUSTOMER = 'ADD_CUSTOMER'
export const GET_CUSTOMER = 'GET_CUSTOMER'
export const GET_CUSTOMERS = 'GET_CUSTOMERS'
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER'
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'
export const FILTER_CUSTOMERS = 'FILTER_CUSTOMERS'
export const START_CUSTOMER_LOADING = 'START_CUSTOMER_LOADING'
export const FINISH_CUSTOMER_LOADING = 'FINISH_CUSTOMER_LOADING'

export const addCustomer = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_CUSTOMER_LOADING })
      const customer = await client.service('customers').create(data)
      if (customer) {
        dispatch({
          type: ADD_CUSTOMER,
          payload: customer
        })
        dispatch(reset('customerForm'))
        dispatch({ type: FINISH_CUSTOMER_LOADING })
        toastSuccess({message: `${toTitleCase(data.name)} has been created`})
      }
    } catch (e) {
      dispatch({ type: FINISH_CUSTOMER_LOADING })
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
    try {
      dispatch({ type: START_CUSTOMER_LOADING })
      const customer = await client.service('customers').get(id)
      if (customer) {
        dispatch({
          type: GET_CUSTOMER,
          payload: customer
        })
        dispatch({ type: FINISH_CUSTOMER_LOADING })
        toastSuccess({message: 'Customer has been loaded!'})
      }
    } catch (e) {
      dispatch({ type: FINISH_CUSTOMER_LOADING })
      toastError({message: e.message})
    }
  }
}

export const getCustomers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_CUSTOMER_LOADING })
      const customers = await client.service('customers').find({})
      if (customers) {
        dispatch({
          type: GET_CUSTOMERS,
          payload: customers.data
        })
        dispatch({ type: FINISH_CUSTOMER_LOADING })
        toastSuccess({message: 'Customer list has been updated!'})
      }
    } catch (e) {
      dispatch({ type: FINISH_CUSTOMER_LOADING })
      toastError({message: e.message})
    }
  }
}
export const removeCustomer = (id) => async (dispatch) => {
  try {
    toastInfo({ message: 'Removing customer...' })
    const result = await client.service('customers').remove(id)
    if (result) {
      dispatch({
        type: REMOVE_CUSTOMER,
        payload: id
      })
      toastSuccess({message: 'Customer has been removed!'})
    }
  } catch (e) {
    toastError({message: e.message})
  }
}

export const updateCustomer = (customer) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_CUSTOMER_LOADING })
      const {_id: id} = customer
      const result = await client.service('customers').patch(id, customer)
      if (result) {
        dispatch({
          type: UPDATE_CUSTOMER,
          payload: customer
        })
        dispatch({ type: FINISH_CUSTOMER_LOADING })
        toastSuccess({message: 'Customer has been updated!'})
      }
    } catch (e) {
      dispatch({ type: FINISH_CUSTOMER_LOADING })
      toastError({message: e.message})
    }
  }
}
