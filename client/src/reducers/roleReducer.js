import {
  RECEIVE_ROLE,
  UPDATE_ROLE,
  RECEIVE_ROLES,
  START_ROLES_LOADING,
  FINISH_ROLES_LOADING,
  REMOVE_ROLE
} from '../actions/roleActions'

const initialState = {
  list: [],
  loading: false
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
    case START_ROLES_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    case FINISH_ROLES_LOADING: {
      return {
        ...state,
        loading: false
      }
    }
    case REMOVE_ROLE: {
      return {
        ...state,
        list: state.list.filter((role) => role._id !== action.payload)
      }
    }
    default:
      return state
  }
}

export default roleReducer
