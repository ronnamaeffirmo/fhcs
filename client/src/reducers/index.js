import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import itemReducer from './itemReducer'
import userReducer from './userReducer'
import salesReducer from './salesReducer'
import inventoryReducer from './inventoryReducer'
import customerReducer from './customerReducer'
import roleReducer from './roleReducer'

const reducer = combineReducers({
  form: formReducer,
  item: itemReducer,
  user: userReducer,
  sales: salesReducer,
  inventory: inventoryReducer,
  customer: customerReducer,
  role: roleReducer
})

export default reducer
