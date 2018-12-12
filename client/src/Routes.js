import React, { Fragment } from 'react'
import PrivateRoute from './containers/PrivateRouteContainer'
import PaddedContainer from './custom-components/PaddedContainer'
import ChangePasswordForm from './containers/ChangePasswordFormContainer'
import ItemList from './containers/ItemListContainer'
import EditFormContainer from './containers/EditItemFormContainer'
import ItemReportsContainer from './containers/ItemReportsContainer'
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
import AddInventoryModal from './containers/AddInventoryContainer'
import SaleTableContainer from './containers/SaleTableContainer'
import EditInventoryModal from './containers/EditInventoryContainer'
import ItemTableContainer from './containers/ItemTableContainer'

const Routes = () => (
  <Fragment>
    <PrivateRoute path='/sales/table' exact component={SaleTableContainer}/>
    <PrivateRoute path='/items/table' exact component={ItemTableContainer}/>
    <PaddedContainer>
      <PrivateRoute path='/' exact component={Dashboard}/>
      <PrivateRoute path='/change-password' component={ChangePasswordForm}/>
      <PrivateRoute path='/items' exact component={ItemList}/>
      <PrivateRoute path='/item/:_id' exact component={EditFormContainer}/>
      <PrivateRoute path='/item/:_id/reports' component={ItemReportsContainer}/>
      <PrivateRoute path='/customers' exact component={CustomerList}/>
      <PrivateRoute path='/customers/update/:id' exact component={EditCustomerContainer}/>
      <PrivateRoute path='/sales' exact component={SalesList}/>
      <PrivateRoute path='/inventories' component={InventoryList}/>
      <PrivateRoute path='/inventories/add/:id' component={AddInventoryModal}/>
      <PrivateRoute path='/inventories/edit/:id' component={EditInventoryModal}/>
      <PrivateRoute path='/roles' exact component={RoleListContainer}/>
      <PrivateRoute path='/roles/new' strict exact component={AddRoleContainer}/>
      <PrivateRoute path='/roles/update/:id' exact component={EditRoleContainer}/>
      <PrivateRoute path='/roles/view/:id' exact component={ViewRoleContainer}/>
      <PrivateRoute path='/users' exact component={UserListContainer}/>
      <PrivateRoute path='/users/new' exact component={AddUserContainer}/>
      <PrivateRoute path='/users/update/:id' exact component={EditUserContainer}/>
      <PrivateRoute path='/sales/new' exact component={AddSaleContainer}/>
      <PrivateRoute path='/sales/update/:id' exact component={EditSaleContainer}/>
    </PaddedContainer>
  </Fragment>
)

export default Routes
