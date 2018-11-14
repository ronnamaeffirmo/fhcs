import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Container } from 'semantic-ui-react'
import AddUserWrapper from './containers/AddUserWrapperContainer'
import LoginFormContainer from './containers/LoginFormContainer'
import ChangePasswordForm from './containers/ChangePasswordFormContainer'
import ItemList from './containers/ItemListContainer'
import EditFormContainer from './containers/EditFormContainer'
import AddSalesRecordContainer from './containers/AddSalesRecordContainer'
import AddCustomerContainer from './containers/AddCustomerContainer'
import SalesList from './containers/SalesListContainer'

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Container>
        {/* <AddItemForm onSubmit={(values) => console.log('values', values)} /> */}
        <Route path='/login' component={LoginFormContainer} />
        <Route path='/changePassword' component={ChangePasswordForm} />
        <Route path='/items' component={ItemList} />
        <Route path='/item/:_id' component={EditFormContainer} />
        <Route path='/addSales' component={AddSalesRecordContainer} />
        <Route path='/addCustomer' component={AddCustomerContainer} />
        <Route path='/sales' component={SalesList} />
        <Route path='/addUser' component={AddUserWrapper} />
      </Container>
    </Router>
  </Provider>
)

export default App
