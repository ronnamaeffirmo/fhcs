import client from '../common/client'
import moment from 'moment'
import { toastError, toastSuccess } from './toasterActions'

export const GET_INVENTORIES = 'GET_INVENTORIES'
export const GET_INVENTORIES_BY_PERIOD = 'GET_INVENTORIES_BY_PERIOD'
export const ADD_INVENTORY = 'ADD_INVENTORY'
export const REMOVE_INVENTORY = 'REMOVE_INVENTORY'
export const REMOVE_ITEM_ERROR = 'REMOVE_ITEM_ERROR'
export const FILTER_INVENTORIES = 'FILTER_INVENTORIES'
export const GET_INVENTORY_REQUEST = 'GET_INVENTORY_REQUEST'
export const GET_INVENTORY = 'GET_INVENTORY'
export const GET_INVENTORY_FAIL = 'GET_INVENTORY_FAIL'
export const PATCH_INVENTORY = 'PATCH_INVENTORY'

const getQueryDate = (amount, unit) => {
  return moment(new Date()).subtract(amount, unit).toDate()
}

export const getInventoriesByPeriod = ({period}) => {
  return async dispatch => {
    try {
      let query = {}
      switch (period) {
        case 'last-7-days':
          query.createdAt = {
            $gte: getQueryDate(7, 'days')
          }
          break
        case 'last-2-weeks':
          query.createdAt = {
            $gte: getQueryDate(2, 'weeks')
          }
          break
        case 'last-month':
          query.createdAt = {
            $gte: getQueryDate(2, 'months'),
            $lte: getQueryDate(1, 'months')
          }
          break
        case 'this-month':
          query.createdAt = {
            $gte: getQueryDate(1, 'months')
          }
          break
        default:
          query = {}
      }
      const inventories = await client.service('inventories').find({query})
      dispatch({
        type: GET_INVENTORIES_BY_PERIOD,
        payload: inventories
      })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const getInventories = () => {
  return async (dispatch) => {
    try {
      const items = await client.service('inventories').find({
        query: {
          $populate: ['item']
        }
      })
      dispatch({
        type: GET_INVENTORIES,
        payload: items.data
      })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const removeInventory = (id) => async (dispatch) => {
  try {
    await client.service('inventories').remove(id)
    dispatch({
      type: REMOVE_INVENTORY,
      payload: id
    })
    toastSuccess({ message: 'Inventory deleted...' })
  } catch (e) {
    toastError({message: e.message})
  }
}

export const updateInventory = (values) => {
  return async (dispatch) => {
    try {
      const { _id } = values
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
        toastSuccess({ message: 'Inventory record successfully updated!' })
      }
    } catch (e) {
      toastError({ message: e.message })
    }
  }
}

export const createInventory = (values) => {
  return async (dispatch) => {
    try {
      console.log('[!] values', values)
      const item = await client.service('inventories').create(values)
      console.log('[!] item created', item)
      dispatch({
        type: ADD_INVENTORY,
        payload: item
      })
      toastSuccess({ message: 'New inventory added!' })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const getInventoryById = (id) => {
  return async dispatch => {
    try {
      dispatch({ type: GET_INVENTORY_REQUEST })
      await dispatch(getInventories())
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
      dispatch({ type: GET_INVENTORY_FAIL })
      toastError({ message: e.message })
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
