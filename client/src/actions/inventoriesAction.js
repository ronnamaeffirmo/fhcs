import client from '../common/client'
import moment from 'moment'

export const GET_INVENTORIES = 'GET_INVENTORIES'
export const ADD_INVENTORY = 'ADD_INVENTORY'

const getQueryDate = (amount, unit) => {
  return moment(new Date()).subtract(amount, unit).toDate()
}

export const getInventories = ({ period }) => {
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

    console.log('[!] query', query)
    console.log('[!] inventories', inventories)

    dispatch({
      type: GET_INVENTORIES,
      payload: inventories
    })
  }
}

export const createInventory = (values) => {
  return async (dispatch) => {
    console.log('values', values)
    const item = await client.service('inventories').create(values)
    console.log('[!] item', item)
    window.alert('Added new item!')
    dispatch({
      type: ADD_INVENTORY,
      payload: item
    })
  }
}
