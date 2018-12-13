import React from 'react'
import { Menu, Popup, Icon, Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PaddedContainer from '../custom-components/PaddedContainer'

const styles = {
  header: {
    width: '100%',
    position: 'relative',
    backgroundColor: '#35383d',
    lineHeight: '70px',
    minHeight: '70px',
    fontWeight: 'bold'
  },
  menuItem: {
    fontSize: '1rem',
    fontWeight: 'normal'
  },
  profilePic: {
    marginRight: '0.25rem'
  }
}

const itemOptions = [
  { key: 'items', as: () => (<Menu.Item icon={'tasks'} style={styles.menuItem} content='Item List' as={Link} to={'/items'}/>) },
  { key: 'inventories', as: () => (<Menu.Item icon={'clipboard'} style={styles.menuItem} content='Inventory List' as={Link} to={'/inventories'}/>) },
  { key: 'itemsTable', as: () => (<Menu.Item icon={'chart line'} content='Item Summary' as={Link} to={'/items/table'}/>) },
  { key: 'inventoryTable', as: () => (<Menu.Item icon={'clipboard list'} content='Inventory Summary' as={Link} to={'/inventory/table'}/>) },
]

const settingOptions = [
  { key: 'roles', as: () => (<Menu.Item icon={'move'} content='Manage Roles' as={Link} to={'/roles'}/>) },
  { key: 'users', as: () => (<Menu.Item icon={'user'} content='Manage Users' as={Link} to={'/users'}/>) }
]

const saleOptions = [
  { key: 'sales', as: () => (<Menu.Item icon={'chart line'} content='View Sales' as={Link} to={'/sales'}/>) },
  { key: 'salesTable', as: () => (<Menu.Item icon={'industry'} content='View Sales Summary' as={Link} to={'/sales/table'}/>) }
]

const Header = ({ user, isAuthenticated, handleLogout }) => (
  <Menu secondary fixed='top' style={styles.header} inverted>
    <PaddedContainer>
      <Popup
        inverted
        size='tiny'
        content='Go back to home'
        position='left center'
        trigger={<Menu.Item header name='home' as={Link} to={'/'}>FIELDSTONE</Menu.Item>}
      />
      <Dropdown item text='Items' options={itemOptions}/>
      <Dropdown item text='Sale' options={saleOptions}/>
      <Menu.Item style={styles.menuItem} name='customers' as={Link} to={'/customers'}/>
      <Dropdown item text='Settings' options={settingOptions}/>
      <Menu.Menu position='right'>
        <Dropdown item icon={null} trigger={
          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.profilePic} size='mini' circular src={user && user.picture ? user.picture : '/images/user.png'} />
            <Icon size='tiny' name='chevron down' />
          </span>
        }>
          <Dropdown.Menu>
            <Dropdown.Item key='greeting' text={<span>Hi, <b>{user && user.username}</b>!</span>} disabled />
            <Dropdown.Item as={Link} to={`/users/update/${user && user._id}`} key='account' text='My account' icon='user' />
            <Dropdown.Item key='logout' text='Logout' icon='sign out' onClick={handleLogout} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </PaddedContainer>
  </Menu>
)

export default Header
