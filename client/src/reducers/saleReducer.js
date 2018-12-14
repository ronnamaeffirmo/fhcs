import {
  REMOVE_SALE,
  RECEIVE_SALES,
  RECEIVE_SALE, APPLY_SALE_PAYMENT,
  RETURN_ITEM,
  START_SALES_LOADING,
  FINISH_SALES_LOADING
} from '../actions/saleActions'
import clone from 'shallow-clone'

const initialState = {
  list: [],
  loading: false
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
              status: action.payload.status
            }
          }
          return sale
        })
      }
    }
    case RETURN_ITEM: {
      const stateClone = clone(state)
      const { saleId, returnQuantity,  itemId} = action.payload
      return {
        ...state,
        list: stateClone.list.map(sale => {
          if (sale._id === saleId) {
            return {
              ...sale,
              items: sale.items.map(item => {
                if (item._id === itemId) {
                  return {
                    ...item,
                    returnQuantity: returnQuantity
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
    case START_SALES_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    case FINISH_SALES_LOADING: {
      return {
        ...state,
        loading: false
      }
    }
    default: {
      return state
    }
  }
}

export default saleReducer
