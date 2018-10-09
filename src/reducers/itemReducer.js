import {
  ADD_ITEM,
  GET_ITEM,
  GET_ITEMS,
  PATCH_ITEM,
  REMOVE_ITEM,
  REMOVE_ITEM_ERROR,
  SELECT_REPORT
} from '../actions/itemActions'

const initialState = {
  items: [],
  report: 'sales'
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        item: action.payload,
        items: [...state.items, action.payload] // when adding a new item, it should also save in the state -M
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
    case PATCH_ITEM : {
      return {
        ...state,
        items: state.items.map(item => {
          if (item._id === action.payload._id) {
            return action.payload
          } else {
            return item
          }
        })
      }
    }
    case GET_ITEM: {
      // console.log('reducer', state)
      const index = state.items.findIndex(item => item._id === action.payload._id)
      if (index > -1) {
        return {
          ...state,
          items: state.items.map(item => {
            if (item._id === action.payload._id) {
              return action.payload
            } else {
              return item
            }
          })
        }
      } else {
        return {
          ...state,
          items: [action.payload]
        }
      }
    }
    case REMOVE_ITEM_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case SELECT_REPORT: {
      return {
        ...state,
        report: action.payload
      }
    }
    default:
      return state
  }
}

export default itemReducer
