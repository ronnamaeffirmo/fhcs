import client from '../common/client'

export const ADD_ITEM = 'ADD_ITEM'
export const GET_ITEM = 'GET_ITEM'
export const GET_ITEMS = 'GET_ITEMS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ITEM_ERROR = 'REMOVE_ITEM_ERROR'

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
    dispatch({ type: REMOVE_ITEM_ERROR, payload: error })
  }
}
