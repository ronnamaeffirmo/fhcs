import {
  GET_INVENTORIES,
  ADD_INVENTORY,
  REMOVE_INVENTORY,
  FILTER_INVENTORIES,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY,
  GET_INVENTORY_FAIL,
} from '../actions/inventoriesAction'
import { search } from '../common/helpers'

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'itemName',
    'description',
    'price',
    'unit'
  ]
}

const initialState = {
  inventories: [],
  filteredInventories: [],
  inventory: {},
  gettingInventory: false
}

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
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
        filteredInventories: [...search(state.inventories, action.payload, fuseOptions)]
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
    default:
      return state
  }
}

export default inventoryReducer
