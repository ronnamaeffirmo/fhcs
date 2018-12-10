import {
  ADD_CUSTOMER,
  FILTER_CUSTOMERS,
  GET_CUSTOMER,
  GET_CUSTOMERS,
  PATCH_CUSTOMER,
  REMOVE_CUSTOMER,
  REMOVE_CUSTOMER_ERROR
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
    'firstname',
    'lastname'
  ]
}

const initialState = {
  customers: [],
  filteredCustomers: []
}

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case PATCH_CUSTOMER : {
      return {
        ...state,
        customers: state.customers.map(customer => {
          if (customer._id === action.payload._id) {
            return action.payload
          } else {
            return customer
          }
        })
      }
    }
    case FILTER_CUSTOMERS: {
      return {
        ...state,
        filteredCustomers: [...search(state.customers, action.payload, fuseOptions)]
      }
    }
    case GET_CUSTOMER: {
      const index = state.customers.findIndex(customer => customer._id === action.payload._id)
      if (index > -1) {
        return {
          ...state,
          customers: state.customers.map(customer => {
            if (customer._id === action.payload._id) {
              return action.payload
            } else {
              return customer
            }
          })
        }
      } else {
        return {
          ...state,
          customers: [action.payload]
        }
      }
    }
    default:
      return state
  }
}

export default customerReducer
