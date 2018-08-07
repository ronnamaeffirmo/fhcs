import { UPDATE_PASSWORD, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../actions/userActions'

const userReducer = (state = {
  currentuser: undefined,
  isAuthenticated: false,
  error: undefined
}, action) => {
  switch (action.type) {
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
    default:
      return state
  }
}

export default userReducer
