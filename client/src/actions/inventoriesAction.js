import client from '../common/client'
import moment from 'moment'

export const GET_INVENTORIES = 'GET_INVENTORIES'
export const GET_INVENTORIES_BY_PERIOD = 'GET_INVENTORIES_BY_PERIOD'
export const ADD_INVENTORY = 'ADD_INVENTORY'
export const REMOVE_INVENTORY = 'REMOVE_INVENTORY'
export const REMOVE_ITEM_ERROR = 'REMOVE_ITEM_ERROR'
export const FILTER_INVENTORIES = 'FILTER_INVENTORIES'

const getQueryDate = (amount, unit) => {
  return moment(new Date()).subtract(amount, unit).toDate()
}

export const getInventoriesByPeriod = ({ period }) => {
  return async dispatch => {
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

    const inventories = await client.service('inventories').find({ query })
    dispatch({
      type: GET_INVENTORIES_BY_PERIOD,
      payload: inventories
    })
  }
}

export const getInventories = () => {
  return async (dispatch) => {
    const items = await client.service('inventories').find({})
    dispatch({
      type: GET_INVENTORIES,
      payload: items.data
    })
  }
}

export const removeInventory = (id) => async (dispatch) => {
  try {
    await client.service('inventories').remove(id)
    dispatch({
      type: REMOVE_INVENTORY,
      payload: id
    })
  } catch (error) {
    dispatch({type: REMOVE_ITEM_ERROR, payload: error})
  }
}

export const createInventory = (values) => {
  return async (dispatch) => {
    console.log('balues', values)
    const item = await client.service('inventories').create(values)
    dispatch({
      type: ADD_INVENTORY,
      payload: item
    })
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
