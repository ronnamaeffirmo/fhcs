import { ADD_ITEM, GET_ITEM, GET_ITEMS, REMOVE_ITEM, REMOVE_ITEM_ERROR } from '../actions/itemActions'

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        item: action.payload
      }
    }
    case GET_ITEM: {
      return {
        ...state,
        item: action.payload
      }
    }
    case GET_ITEMS: {
      return {
        ...state,
        items: action.payload
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
    }
    case REMOVE_ITEM_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    default:
      return state
  }
}

export default itemReducer
