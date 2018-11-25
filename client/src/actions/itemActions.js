import client from '../common/client'

export const ADD_ITEM = 'ADD_ITEM'
export const GET_ITEM = 'GET_ITEM'
export const GET_ITEMS = 'GET_ITEMS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ITEM_ERROR = 'REMOVE_ITEM_ERROR'
export const GET_ITEM_ERROR = 'GET_ITEM_ERROR'
export const PATCH_ITEM = 'PATCH_ITEM'
export const PATCH_ITEM_ERROR = 'PATCH_ITEM_ERROR'
export const SELECT_REPORT = 'SELECT_REPORT'

export const createItem = (values) => {
  return async (dispatch) => {
    const item = await client.service('items').create(values)
    console.log('[!] item', item)
    window.alert('Added new item!')
    dispatch({
      type: ADD_ITEM,
      payload: item
    })
  }
}

export const getItem = (id) => {
  return async (dispatch) => {
    await dispatch(getItems())
    const item = await client.service('items').get(id)
    try {
      dispatch({
        type: GET_ITEM,
        payload: item
      })
    } catch (error) {
      dispatch({type: GET_ITEM_ERROR, payload: error})
    }
  }
}

export const getItems = () => {
  return async (dispatch) => {
    const items = await client.service('items').find({})
    dispatch({
      type: GET_ITEMS,
      payload: items.data
    })
  }
}

export const removeItem = (id) => async (dispatch) => {
  try {
    await client.service('items').remove(id)
    dispatch({
      type: REMOVE_ITEM,
      payload: id
    })
  } catch (error) {
    dispatch({type: REMOVE_ITEM_ERROR, payload: error})
  }
}

export const patchItem = (id, data) => async (dispatch) => {
  try {
    const patchItem = await client.service('items').patch(id, {$set: data})
    dispatch({
      type: PATCH_ITEM,
      payload: patchItem
    })
  } catch (error) {
    dispatch({type: PATCH_ITEM_ERROR, payload: error})
  }
}

export const selectReport = (report) => {
  return async dispatch => {
    dispatch({
      type: SELECT_REPORT,
      payload: report
    })
  }
}
