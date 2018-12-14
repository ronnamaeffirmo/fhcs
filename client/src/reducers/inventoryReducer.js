import {
  GET_INVENTORIES,
  ADD_INVENTORY,
  REMOVE_INVENTORY,
  FILTER_INVENTORIES,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY,
  GET_INVENTORY_FAIL,
  PATCH_INVENTORY,
  START_INVENTORY_LOADING,
  FINISH_INVENTORY_LOADING
} from '../actions/inventoryActions'
import { search } from '../common/helpers'

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'item.name',
    'date',
    'price',
    'unit'
  ]
}

const initialState = {
  inventories: [],
  filteredList: [],
  inventory: {},
  gettingInventory: false,
  loading: false,
}

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_INVENTORY_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    case FINISH_INVENTORY_LOADING: {
      return {
        ...state,
        loading: false
      }
    }
    case GET_INVENTORIES: {
      return {
        ...state,
        inventories: action.payload
      }
    }
    case ADD_INVENTORY: {
      return {
        ...state,
        inventory: action.payload,
        inventories: [...state.inventories, action.payload]
      }
    }
    case REMOVE_INVENTORY: {
      return {
        ...state,
        inventories: state.inventories.filter(item => item._id !== action.payload)
      }
    }
    case FILTER_INVENTORIES: {
      return {
        ...state,
        filteredList: [...search(state.inventories, action.payload, fuseOptions)]
      }
    }
    case GET_INVENTORY: {
      return {
        ...state,
        inventory: action.payload,
        gettingInventory: false
      }
    }
    case GET_INVENTORY_REQUEST: {
      return {
        ...state,
        gettingInventory: true
      }
    }
    case GET_INVENTORY_FAIL: {
      return {
        ...state,
        gettingInventory: false
      }
    }
    case PATCH_INVENTORY : {
      return {
        ...state,
        inventories: state.inventories.map(item => {
          if (item._id === action.payload._id) {
            return action.payload
          } else {
            return item
          }
        })
      }
    }
    default:
      return state
  }
}

export default inventoryReducer
