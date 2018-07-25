import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import itemReducer from './itemReducer'
import userReducer from './userReducer'
const reducer = combineReducers({
  form: formReducer,
  item: itemReducer,
  user: userReducer
})

export default reducer
