import React from 'react'
import { Route } from 'react-router-dom'
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
import EditCustomerContainer from './containers/EditCustomerContainer'

const Routes = () => (
  <PaddedContainer>
    <Route path='/' exact component={Dashboard}/>
    <Route path='/login' component={LoginFormContainer}/>
    <Route path='/change-password' component={ChangePasswordForm}/>

    {/* <Route path='/items' component={ItemList}/> */}
    <PrivateRoute path='/items' exact component={ItemList}/>

    <Route path='/item/:_id' exact component={EditFormContainer}/>
    <Route path='/item/:_id/reports' component={ItemReportsContainer}/>

    <Route path='/customers' exact  component={CustomerList}/>
    <Route path='/customers/update/:id' exact component={EditCustomerContainer}/>
    <Route path='/sales' exact component={SalesList}/>
    <Route path='/inventories' component={InventoryList}/>
    {/*
      ROLES ROUTES
      create - `service`/new
      update - `service`/update/`:id`
      view - `service`/view/`:id`
    */}
    <Route path='/roles' exact component={RoleListContainer}/>
    <Route path='/roles/new' strict exact component={AddRoleContainer}/>
    <Route path='/roles/update/:id' exact component={EditRoleContainer}/>
    <Route path='/roles/view/:id' exact component={ViewRoleContainer}/>

    <Route path='/users' exact component={UserListContainer} />
    <Route path='/users/new' exact component={AddUserContainer} />
    <Route path='/users/update/:id' exact component={EditUserContainer} />


    <Route path='/sales/new' exact component={AddSaleContainer} />
    <Route path='/sales/update/:id' exact component={EditSaleContainer} />

  </PaddedContainer>
)

export default Routes
