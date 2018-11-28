import {
  RECEIVE_ROLE,
  UPDATE_ROLE
} from '../actions/roleActions'

const roleReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ROLE: {
      return {
        ...state,
        updateSelection: {
          ...action.payload
        }
      }
    }
    case UPDATE_ROLE: {
      return {
        ...state,
        updateSelection: {
          ...action.payload
        }
      }
    }
    default:
      return state
  }
}

export default roleReducer
