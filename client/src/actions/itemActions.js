import client from '../common/client'
import { toastError, toastSuccess } from './toasterActions'

export const ADD_ITEM = 'ADD_ITEM'
export const GET_ITEM_REQUEST = 'GET_ITEM_REQUEST'
export const GET_ITEM = 'GET_ITEM'
export const GET_ITEMS = 'GET_ITEMS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ITEM_ERROR = 'REMOVE_ITEM_ERROR'
export const PATCH_ITEM = 'PATCH_ITEM'
export const SELECT_REPORT = 'SELECT_REPORT'
export const FILTER_ITEMS = 'FILTER_ITEMS'
export const GET_SEARCH_ITEMS = 'GET_SEARCH_ITEMS'
export const GET_ITEM_REPORT = 'GET_ITEM_REPORT'
export const START_LOADING = 'START_LOADING'
export const FINISH_LOADING = 'FINISH_LOADING'

export const getItemReport = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch({type: START_LOADING})
      const item = await client.service('items').get(itemId)
      console.log(item)
      if (item) {
        dispatch({
          type: GET_ITEM_REPORT,
          payload: item
        })
        dispatch({type: FINISH_LOADING})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}


export const filterItems = (value) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ITEMS,
      payload: value
    })
  }
}

export const getItemSearchList = () => {
  return async (dispatch) => {
    try {
      const items = await client.service('items').find({
        query: {$limit: 10000},
        $select: ['name', '_id', 'price']
      })
      if (items) {
        dispatch({
          type: GET_SEARCH_ITEMS,
          payload: items.data
        })
        toastSuccess({message: 'Item list has been updated!'})
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const createItem = (values) => {
  return async (dispatch) => {
    try {
      const item = await client.service('items').create(values)
      toastSuccess({message: 'New item saved successfully'})
      dispatch({
        type: ADD_ITEM,
        payload: item
      })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const getItem = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_ITEM_REQUEST })
      await dispatch(getItems())
      const item = await client.service('items').get(id)
      dispatch({
        type: GET_ITEM,
        payload: item
      })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const getItems = () => {
  return async (dispatch) => {
    try {
      const items = await client.service('items').find({})
      dispatch({
        type: GET_ITEMS,
        payload: items.data
      })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const removeItem = (id) => {
  return async (dispatch) => {
    try {
      await client.service('items').remove(id)
      dispatch({
        type: REMOVE_ITEM,
        payload: id
      })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const patchItem = (id, data) => {
  return async (dispatch) => {
    try {
      const patchItem = await client.service('items').patch(id, {$set: data})
      dispatch({
        type: PATCH_ITEM,
        payload: patchItem
      })
    } catch (e) {
      toastError({message: e.message})
    }
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
