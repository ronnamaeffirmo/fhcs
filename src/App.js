import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Container } from 'semantic-ui-react'

import LoginFormContainer from './containers/LoginFormContainer'
import ChangePasswordForm from './containers/ChangePasswordFormContainer'
import ItemList from './containers/ItemListContainer'
import EditFormContainer from './containers/EditFormContainer'
import AddSalesRecordContainer from './containers/AddSalesRecordContainer'
import ItemReportsContainer from './containers/ItemReportsContainer'

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Container>
        {/* <AddItemForm onSubmit={(values) => console.log('values', values)} /> */}
        <Switch>
          <Route path='/login' component={LoginFormContainer} />
          <Route path='/changePassword' component={ChangePasswordForm} />
          <Route path='/items' component={ItemList} />
          <Route path='/item/:_id' exact component={EditFormContainer} />
          <Route path='/item/:_id/reports' component={ItemReportsContainer} />
          <Route path='/addSales' component={AddSalesRecordContainer} />
        </Switch>
      </Container>
    </Router>
  </Provider>
)

export default App
