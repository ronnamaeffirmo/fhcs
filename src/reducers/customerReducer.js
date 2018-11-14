import { ADD_CUSTOMER } from '../actions/customerActions'

const customerReducer = ( state = { customers: [] }, action) => {
  switch (action.type) {
    case ADD_CUSTOMER: {
        return {
            ...state,
            customers: [...state.customers, action.payload]
        }
    }
    default:
    return state
  }
}

export default customerReducer
