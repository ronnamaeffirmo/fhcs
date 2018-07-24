import { UPDATE_PASSWORD } from '../actions/userActions'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD: {
      return {
        ...state,
        action: action.payload
      }
    }
    default:
      return state
  }
}

export default userReducer
