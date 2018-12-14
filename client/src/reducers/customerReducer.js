import {
  ADD_CUSTOMER,
  FILTER_CUSTOMERS,
  GET_CUSTOMER,
  GET_CUSTOMERS,
  REMOVE_CUSTOMER,
  UPDATE_CUSTOMER,
  START_CUSTOMER_LOADING,
  FINISH_CUSTOMER_LOADING
} from '../actions/customerActions'
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
    'company',
    'address',
  ]
}

const initialState = {
  customers: [],
  loading: false,
  filteredList: []
}

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_CUSTOMER_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    case FINISH_CUSTOMER_LOADING: {
      return {
        ...state,
        loading: false
      }
    }
    case ADD_CUSTOMER: {
      return {
        ...state,
        customer: action.payload,
        customers: [...state.customers, action.payload]
      }
    }
    case GET_CUSTOMERS: {
      return {
        ...state,
        customers: action.payload
      }
    }
    case REMOVE_CUSTOMER: {
      return {
        ...state,
        customers: state.customers.filter(customer => customer._id !== action.payload)
      }
    }
    case UPDATE_CUSTOMER : {
      return {
        ...state,
        selection: action.payload
      }
    }
    case FILTER_CUSTOMERS: {
      return {
        ...state,
        filteredList: [...search(state.customers, action.payload, fuseOptions)]
      }
    }
    case GET_CUSTOMER: {
      return {
        ...state,
        selection: action.payload
      }
    }
    default:
      return state
  }
}

export default customerReducer
