import {
  ADD_SALE,
  REMOVE_SALE,
  RECEIVE_SALES,
  RECEIVE_SALE, APPLY_SALE_PAYMENT,
  RETURN_ITEM
} from '../actions/salesActions'
import { removeItemFromArray } from '../common/helpers'
import clone from 'shallow-clone'

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
    case APPLY_SALE_PAYMENT: {
      return {
        ...state,
        list: state.list.map(sale => {
          if (sale._id === action.payload._id) {
            return {
              ...sale,
              payment: action.payload.payment,
              paymentDate: action.payload.paymentDate
            }
          }
          return sale
        })
      }
    }
    case RETURN_ITEM: {
      console.log('salesId:', action.payload.saleId)
      console.log('itemId', action.payload.itemId)
      console.log(action.payload.returnQuantity)
      const stateClone = clone(state)
      console.log(stateClone)
      return {
        ...state,
        list: stateClone.list.map(sale => {
          if (sale._id === action.payload.saleId) {
            return {
              ...sale,
              items: sale.items.map(item => {
                if (item._id === action.payload.itemId) {
                  return {
                    ...item,
                    returnQuantity: action.payload.returnQuantity
                  }
                }
                else {
                  return item
                }
              })
            }
          }
          else {
            return sale
          }
        })
      }
    }
    case REMOVE_SALE: {
      return {
        ...state,
        list: state.list.filter((sale) => sale._id !== action.payload)
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
