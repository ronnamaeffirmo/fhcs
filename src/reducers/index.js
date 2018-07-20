import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import itemReducer from './itemReducer'

const reducer = combineReducers({
  form: formReducer,
  item: itemReducer
})

export default reducer
