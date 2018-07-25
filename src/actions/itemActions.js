import client from '../common/client'

export const ADD_ITEM = 'ADD_ITEM'
export const GET_ITEM = 'GET_ITEM'

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
