import client from '../common/client'

export const ADD_ITEM = 'ADD_ITEM'
export const GET_ITEM = 'GET_ITEM'
export const GET_ITEMS = 'GET_ITEMS'

export const createItem = (values) => {
  return async (dispatch) => {
    const item = await client.service('items').create(values)

    console.log('item', item)
    window.alert('added new item!')

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
      payload: items
    })
  }
}
