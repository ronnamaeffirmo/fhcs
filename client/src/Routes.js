import React from 'react'
import { Route } from 'react-router-dom'
import PaddedContainer from './custom-components/PaddedContainer'

import AddUserWrapper from './containers/AddUserWrapperContainer'
import LoginFormContainer from './containers/LoginFormContainer'
import ChangePasswordForm from './containers/ChangePasswordFormContainer'
import ItemList from './containers/ItemListContainer'
import EditFormContainer from './containers/EditItemFormContainer'
import AddSalesRecordContainer from './containers/AddSalesRecordContainer'
import ItemReportsContainer from './containers/ItemReportsContainer'
import AddCustomerContainer from './containers/AddCustomerContainer'
import SalesList from './containers/SalesListContainer'
import Dashboard from './components/Dashboard'
import CustomerList from './containers/CustomerListContainer'
import InventoryList from './containers/InventoryListContainer'

const Routes = () => (
  <PaddedContainer>
    <Route path='/' exact component={Dashboard} />
    <Route path='/login' component={LoginFormContainer} />
    <Route path='/change-password' component={ChangePasswordForm} />
    <Route path='/items' component={ItemList} />
    <Route path='/item/:_id' exact component={EditFormContainer} />
    <Route path='/item/:_id/reports' component={ItemReportsContainer} />
    <Route path='/add-sales' component={AddSalesRecordContainer} />
    <Route path='/add-customer' component={AddCustomerContainer} />
    <Route path='/customers' component={CustomerList} />
    <Route path='/sales' component={SalesList} />
    <Route path='/add-user' component={AddUserWrapper} />
    <Route path='/inventories' component={InventoryList} />
  </PaddedContainer>
)

export default Routes
