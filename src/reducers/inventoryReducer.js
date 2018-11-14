import { GET_INVENTORIES } from '../actions/inventoriesAction'

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
    default:
      return state
  }
}

export default inventoryReducer
