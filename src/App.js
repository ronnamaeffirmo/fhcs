import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Container } from 'semantic-ui-react'

import LoginFormContainer from './containers/LoginFormContainer'
import AddItemForm from './containers/AddItemFormContainer'
import ChangePasswordForm from './containers/ChangePasswordFormContainer'
import ItemList from './containers/ItemListContainer'
import EditFormContainer from './containers/EditFormContainer'
import AddSalesRecordContainer from './containers/AddSalesRecordContainer'

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Container>
        {/* <AddItemForm onSubmit={(values) => console.log('values', values)} /> */}
        <Route path='/login' component={LoginFormContainer} />
        <Route path='/addItem' component={AddItemForm} />
        <Route path='/changePassword' component={ChangePasswordForm} />
        <Route path='/items' component={ItemList} />
        <Route path='/item/:_id' component={EditFormContainer} />
        <Route path='/addSales' component={AddSalesRecordContainer} />
      </Container>
    </Router>
  </Provider>
)

export default App
