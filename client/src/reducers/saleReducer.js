import {
  ADD_SALE,
  REMOVE_SALE,
  RECEIVE_SALES,
  RECEIVE_SALE
} from '../actions/salesActions'
import { removeItemFromArray } from '../common/helpers'

const initialState = {
  list: [],
}

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SALE: {
      return {
        ...state,
        selection: action.payload
      }
    }
    case REMOVE_SALE: {
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload)
      }
    }
    case RECEIVE_SALES: {
      return {
        ...state,
        list: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default saleReducer
