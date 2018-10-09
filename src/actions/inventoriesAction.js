import client from '../common/client'

export const GET_INVENTORIES = 'GET_INVENTORIES'

export const getInventories = (fromDate) => {
  return async dispatch => {
    const inventories = await client.service('inventories').find({})

    console.log('inventories', inventories)

    dispatch({
      type: GET_INVENTORIES,
      payload: inventories
    })
  }
}
