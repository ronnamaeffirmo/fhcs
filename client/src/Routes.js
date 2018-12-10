import React from 'react'
import PrivateRoute from './containers/PrivateRouteContainer'

import PaddedContainer from './custom-components/PaddedContainer'
import LoginFormContainer from './containers/LoginFormContainer'
import ChangePasswordForm from './containers/ChangePasswordFormContainer'
import ItemList from './containers/ItemListContainer'
import EditFormContainer from './containers/EditItemFormContainer'
import ItemReportsContainer from './containers/ItemReportsContainer'
import AddCustomerContainer from './containers/AddCustomerContainer'
import SalesList from './containers/SaleListContainer'
import Dashboard from './components/Dashboard'
import CustomerList from './containers/CustomerListContainer'
import InventoryList from './containers/InventoryListContainer'
import AddRoleContainer from './containers/AddRoleContainer'
import EditRoleContainer from './containers/EditRoleContainer'
import ViewRoleContainer from './containers/ViewRoleContainer'
import RoleListContainer from './containers/RoleListContainer'
import UserListContainer from './containers/UserListContainer'
import AddUserContainer from './containers/AddUserContainer'
import EditUserContainer from './containers/EditUserContainer'
import AddSaleContainer from './containers/AddSaleContainer'
import EditSaleContainer from './containers/EditSaleContainer'

const Routes = () => (
  <PaddedContainer>
    <PrivateRoute path='/' exact component={Dashboard}/>
    <PrivateRoute path='/change-password' component={ChangePasswordForm}/>
    <PrivateRoute path='/items' component={ItemList}/>
    <PrivateRoute path='/item/:_id' exact component={EditFormContainer}/>
    <PrivateRoute path='/item/:_id/reports' component={ItemReportsContainer}/>
    <PrivateRoute path='/add-customer' component={AddCustomerContainer}/>
    <PrivateRoute path='/customers' component={CustomerList}/>
    <PrivateRoute path='/sales' exact component={SalesList}/>
    <PrivateRoute path='/inventories' component={InventoryList}/>
    {/*
      ROLES ROUTES
      create - `service`/new
      update - `service`/update/`:id`
      view - `service`/view/`:id`
    */}
    <PrivateRoute path='/roles' exact component={RoleListContainer}/>
    <PrivateRoute path='/roles/new' strict exact component={AddRoleContainer}/>
    <PrivateRoute path='/roles/update/:id' exact component={EditRoleContainer}/>
    <PrivateRoute path='/roles/view/:id' exact component={ViewRoleContainer}/>

    <PrivateRoute path='/users' exact component={UserListContainer} />
    <PrivateRoute path='/users/new' exact component={AddUserContainer} />
    <PrivateRoute path='/users/update/:id' exact component={EditUserContainer} />


    <PrivateRoute path='/sales/new' exact component={AddSaleContainer} />
    <PrivateRoute path='/sales/update/:id' exact component={EditSaleContainer} />

  </PaddedContainer>
)

export default Routes
