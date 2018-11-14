import {
  GET_CUSTOMERS,
  ON_CUSTOMER_DROPDOWN_CHANGE,
  ON_INVOICE_NUMBER_CHANGE,
  ON_CALENDAR_DATE_CHANGE,
  ON_NET_TERMS_CHANGE,
  COMPUTE_DATE_TO,
  ON_REMARKS_CHANGE,
  ON_ITEM_SEARCH,
  ON_ITEM_SEARCH_RESULT,
  ON_SELECT_SEARCH_RESULT,
  ON_POPULATE,
  ON_PRICE_CHANGE,
  ON_DISCOUNT_CHANGE,
  ON_QUANTITY_CHANGE,
  BUTTON_ADD_ITEM,
  CANCEL_BUTTON,
  REMOVE_FROM_LIST,
  CREATE_SALES_RECORD,
  GET_SALES,
  REMOVE_SALE
} from '../actions/salesAction'

const initialState = { 
  customer: undefined,
  invoiceNumber: undefined,
  dateFrom: undefined,
  terms: undefined,
  dateTo: undefined,
  remarks: undefined,
  discount: undefined,
  itemLists: [],
  sales: []
}

const salesReducer = (state = initialState, action) => {
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
    case CREATE_SALES_RECORD: {
      return {
        ...state,
        sales: [...state.sales, action.payload]
      }
    }
    case CANCEL_BUTTON: {
       return {
         ...state,
        customer: action.payload.customer,
        invoiceNumber: action.payload.invoiceNumber,
        dateFrom: action.payload.dateFrom,
        terms: action.payload.terms,
        dateTo: action.payload.dateTo,
        remarks: action.payload.remarks,
        discount: action.payload.discount,
        itemLists: action.payload.itemLists,
        searchValue: action.payload.searchValue,
        price: action.payload.price
       }
    }
    case BUTTON_ADD_ITEM: {
      return {
        ...state,
        itemLists: [...state.itemLists, action.payload]
      }
    }
    case REMOVE_FROM_LIST: {
      return {
        ...state,
        itemLists: state.itemLists.filter(item => item._id !== action.payload)
      }
    }
    case ON_QUANTITY_CHANGE: {
      return {
        ...state,
        quantity: action.payload
      }
    }
    case ON_DISCOUNT_CHANGE: {
      return {
        ...state,
        discount: action.payload
      }
    }
    case ON_PRICE_CHANGE: {
      return {
        ...state,
        price: action.payload
      }
    }
    case ON_SELECT_SEARCH_RESULT: {
      return {
        ...state,
        selectedResult: action.payload
      }
    }
    case ON_POPULATE:{
      return {
        ...state,
        price: action.payload.price,
        searchValue: action.payload.searchValue
      }
    }
    case ON_ITEM_SEARCH_RESULT: {
      return {
        ...state,
        itemSearchResult: action.payload
      }
    }
    case ON_ITEM_SEARCH: {
      return {
        ...state,
        searchValue: action.payload
      }
    }
    case ON_REMARKS_CHANGE: {
      return {
        ...state,
        remarks: action.payload
      }
    }
    case ON_CUSTOMER_DROPDOWN_CHANGE: {
      return {
        ...state,
        customer: action.payload
      }
    }
    case ON_INVOICE_NUMBER_CHANGE: {
      return {
        ...state,
        invoiceNumber: action.payload
      }
    }
    case ON_CALENDAR_DATE_CHANGE: {
      return {
        ...state,
        dateFrom: action.payload
      }
    }
    case ON_NET_TERMS_CHANGE: {
      return {
        ...state,
        terms: action.payload
      }
    }
    case COMPUTE_DATE_TO: {
      return {
        ...state,
        dateTo: action.payload
      }
    }
    default:
      return state
  }
}

export default salesReducer
