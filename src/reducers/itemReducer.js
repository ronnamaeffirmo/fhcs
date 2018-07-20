import { ADD_ITEM, GET_ITEM } from '../actions/itemActions'

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
    default:
      return state
  }
}

export default itemReducer
