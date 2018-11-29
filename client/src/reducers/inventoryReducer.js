import {
  GET_INVENTORIES,
  ADD_INVENTORY
} from '../actions/inventoriesAction'

const initialState = {
  inventories: []
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
    default:
      return state
  }
}

export default inventoryReducer
