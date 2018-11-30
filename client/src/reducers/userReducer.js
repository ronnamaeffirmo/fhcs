import {
  ADD_USER,
  UPDATE_PASSWORD,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  RECEIVE_USERS,
  DELETE_USER
} from '../actions/userActions'
import { removeItemFromArray } from '../common/helpers'

const initialState = {
  currentuser: undefined,
  isAuthenticated: false,
  error: undefined,
  list: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // ADMINISTRATION
    case RECEIVE_USERS:
      return {
        ...state,
        list: action.payload
      }
    case DELETE_USER: {
      return {
        ...state,
        list: state.list.filter(user => user._id !== action.payload)
      }
    }
    case UPDATE_PASSWORD: {
      return {
        ...state,
        action: action.payload
      }
    }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: action.isAuthenticated,
        err: undefined
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.err
      }
    case USER_LOGOUT:
      return {
        ...state,
        currentUser: undefined,
        isAuthenticated: action.isAuthenticated,
        error: undefined
      }
    case ADD_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default userReducer
