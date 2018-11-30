import {
  GET_INVENTORIES,
  ADD_INVENTORY,
  REMOVE_INVENTORY,
  FILTER_INVENTORIES,
  TOGGLE_INVENTORIES_MODAL
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
  isModalOpen: false
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
    case TOGGLE_INVENTORIES_MODAL: {
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      }
    }
    default:
      return state
  }
}

export default inventoryReducer
