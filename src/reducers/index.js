import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import itemReducer from './itemReducer'
import userReducer from './userReducer'
import salesReducer from './salesReducer'
import customerReducer from './customerReducer'

const reducer = combineReducers({
  form: formReducer,
  item: itemReducer,
  user: userReducer,
  sales: salesReducer,
  customer: customerReducer
})

export default reducer
