import {
  ADD_USER,
  UPDATE_PASSWORD,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  RECEIVE_USERS,
  DELETE_USER,
  RECEIVE_USER,
  SELECT_USER
} from '../actions/userActions'

const initialState = {
  currentUser: undefined,
  isAuthenticated: false,
  error: undefined,
  list: [],
  authLoading: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // ADMINISTRATION
    case SELECT_USER: {
      return {
        ...state,
        selection: action.payload
      }
    }
    case RECEIVE_USER: {
      return {
        ...state,
        selection: action.payload
      }
    }
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
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        authLoading: true
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: action.isAuthenticated,
        authLoading: false,
        err: undefined
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        authLoading: false
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
