import { ADD_SALES_RECORD } from '../actions/salesAction'

const salesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SALES_RECORD: {
      return {
        ...state,
        salesRecord: action.payload
      }
    }
    default:
      return state
  }
}

export default salesReducer
