import {
  ADD_ITEM,
  FILTER_ITEMS,
  GET_ITEM,
  GET_ITEM_REQUEST,
  GET_ITEMS,
  PATCH_ITEM,
  REMOVE_ITEM,
  REMOVE_ITEM_ERROR,
  SELECT_REPORT,
  GET_SEARCH_ITEMS
} from '../actions/itemActions'
import { search } from '../common/helpers'

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'name',
    'description',
    'price',
    'unit'
  ]
}

const initialState = {
  list: [],
  filteredList: [],
  report: 'sales',
  gettingItem: false,
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        item: action.payload,
        list: [...state.list, action.payload] // when adding a new item, it should also save in the state -M
      }
    }
    case GET_SEARCH_ITEMS: {
      return {
        ...state,
        searchList: action.payload
      }
    }
    case GET_ITEMS: {
      return {
        ...state,
        list: action.payload
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        list: state.list.filter(item => item._id !== action.payload)
      }
    }
    case PATCH_ITEM : {
      return {
        ...state,
        list: state.list.map(item => {
          if (item._id === action.payload._id) {
            return action.payload
          } else {
            return item
          }
        })
      }
    }
    case FILTER_ITEMS: {
      return {
        ...state,
        filteredList: [...search(state.list, action.payload, fuseOptions)]
      }
    }
    case GET_ITEM_REQUEST: {
      return {
        ...state,
        gettingItem: true
      }
    }
    case GET_ITEM: {
      return {
        ...state,
        foundItem: action.payload,
        gettingItem: false
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
