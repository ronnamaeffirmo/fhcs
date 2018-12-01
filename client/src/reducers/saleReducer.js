import {
  ADD_SALE,
  REMOVE_SALE,
  RECEIVE_SALES,
  RECEIVE_SALE
} from '../actions/salesAction'

const initialState = {
  list: [],
}

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS: {
      return {
        ...state,
        customers: action.payload
      }
    }
    case REMOVE_SALE: {
      return {
        ...state,
        sales: state.sales.filter(item => item._id !== action.payload)
      }
    }
    case GET_SALES: {
      return {
        ...state,
        sales: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default saleReducer
