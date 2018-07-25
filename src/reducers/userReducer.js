import { ADD_USER } from '../actions/userActions'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    default:
      return state
  }
}

export default userReducer
