
const initialState = { currentuser: undefined, isAuthenticated: false, err: undefined }

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_AUTHENTICATE_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: action.isAuthenticated,
        err: undefined
      }
    case 'USER_AUTHENTICATE_FAIL':
      return {
        ...state,
        error: action.err
      }
    case 'USER_LOGOUT':
      return {
        ...state,
        currentUser: undefined,
        isAuthenticated: action.isAuthenticated,
        error: undefined
      }
  }
}

export default user
