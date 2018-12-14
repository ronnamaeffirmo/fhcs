import client from '../common/client'
import moment from 'moment'
import { toastError, toastSuccess } from './toasterActions'

export const GET_INVENTORIES = 'GET_INVENTORIES'
export const GET_INVENTORIES_BY_PERIOD = 'GET_INVENTORIES_BY_PERIOD'
export const ADD_INVENTORY = 'ADD_INVENTORY'
export const REMOVE_INVENTORY = 'REMOVE_INVENTORY'
export const FILTER_INVENTORIES = 'FILTER_INVENTORIES'
export const GET_INVENTORY_REQUEST = 'GET_INVENTORY_REQUEST'
export const GET_INVENTORY = 'GET_INVENTORY'
export const GET_INVENTORY_FAIL = 'GET_INVENTORY_FAIL'
export const PATCH_INVENTORY = 'PATCH_INVENTORY'

export const getInventories = () => {
  return async (dispatch) => {
    try {
      const inventories = await client.service('inventories').find({
        query: {
          $populate: ['item']
        }
      })
      if (inventories) {
        dispatch({
          type: GET_INVENTORIES,
          payload: inventories.data
        })
        toastSuccess({message: 'Successfully fetched inventories!'})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const removeInventory = (id) => async (dispatch) => {
  try {
    const removedInventory = await client.service('inventories').remove(id)
    if (removedInventory) {
      dispatch({
        type: REMOVE_INVENTORY,
        payload: id
      })
      toastSuccess({message: 'Inventory data successfully removed!'})
    }
  } catch (e) {
    toastError({message: e.message})
  }
}

export const updateInventory = (values) => {
  return async (dispatch) => {
    try {
      const {_id} = values
      const result = await client.service('inventories').update(_id, values, {
        query: {
          $populate: ['item']
        }
      })
      if (result) {
        dispatch({
          type: PATCH_INVENTORY,
          payload: result
        })
        toastSuccess({message: 'Inventory data successfully updated!'})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const createInventory = (values) => {
  return async (dispatch) => {
    try {
      const item = await client.service('inventories').create(values, {
        query: {
          populate: ['item']
        }
      })
      if (item) {
        dispatch({
          type: ADD_INVENTORY,
          payload: item
        })
        toastSuccess({message: 'New inventory added!'})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const getInventoryById = (id) => {
  return async dispatch => {
    try {
      dispatch({type: GET_INVENTORY_REQUEST})
      const inventory = await client.service('inventories').get(id, {
        query: {
          $populate: ['item']
        }
      })
      inventory.itemName = inventory.item.name
      if (inventory) {
        dispatch({
          type: GET_INVENTORY,
          payload: inventory
        })
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const filterInventories = (value) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_INVENTORIES,
      payload: value
    })
  }
}
