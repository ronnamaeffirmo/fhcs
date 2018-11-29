import {
  RECEIVE_ROLE,
  UPDATE_ROLE,
  RECEIVE_ROLES
} from '../actions/roleActions'

const initialState = {
  list: []
}

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ROLE: {
      return {
        ...state,
        selection: {
          ...action.payload
        }
      }
    }
    case RECEIVE_ROLES: {
      return {
        ...state,
        list: action.payload
      }
    }
    case UPDATE_ROLE: {
      return {
        ...state,
        selection: {
          ...action.payload
        }
      }
    }
    default:
      return state
  }
}

export default roleReducer
