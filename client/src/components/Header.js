import React from 'react'
import { Menu, Popup, Icon, Dropdown } from 'semantic-ui-react'
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
  }
}

const userOptions = [
  { key: 'greeting', text: <span>Hi, <b>User</b>!</span>, disabled: true },
  { key: 'account', text: 'My account', icon: 'user' },
  { key: 'logout', text: 'Logout', icon: 'sign out' }
]

const itemOptions = [
  { as: () => (<Menu.Item icon={'tasks'} style={styles.menuItem} name='item list' as={Link} to={'/items'}/>) },
  { as: () => (<Menu.Item icon={'clipboard'} style={styles.menuItem} name='inventory list' as={Link} to={'/inventories'}/>) }
]

const settingOptions = [
  { as=() => (<Menu.Item icon={'move'} name='manage roles' as={Link} to={'/roles'}/>) },
  { as=() => (<Menu.Item icon={'user'} name='manage users' as={Link} to={'/users'}/>) }
]

const Header = () => (
  <Menu secondary fixed='top' style={styles.header} inverted>
    <PaddedContainer>
      <Popup
        inverted
        size='tiny'
        content='Go back to home'
        position='left center'
        trigger={<Menu.Item header name='home' as={Link} to={'/'}>FIELDSTONE</Menu.Item>}
      />
      <Menu.Item>
        <Dropdown
          floating
          icon={null}
          pointing='top right'
          options={itemOptions}
          trigger={
            <Menu.Item fitted style={styles.menuItem}>
              <span>Items</span>
            </Menu.Item>
          }
        />
      </Menu.Item>
      <Menu.Item style={styles.menuItem} name='sales' as={Link} to={'/sales'}/>
      <Menu.Item style={styles.menuItem} name='customers' as={Link} to={'/customers'}/>
      <Menu.Item>
        <Dropdown
          floating
          icon={null}
          pointing='top right'
          options={settingOptions}
          trigger={
            <Menu.Item fitted style={styles.menuItem}>
              <span>Settings</span>
            </Menu.Item>
          }
        />
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Dropdown
            floating
            icon={null}
            options={userOptions}
            trigger={
              <Popup 
                inverted
                size='tiny'
                content='View user profile'
                position='right center'
                trigger={
                  <Menu.Item fitted>
                    <Icon name='user circle' size='large' />
                    <span>User</span>
                  </Menu.Item>
                }
              />
            }
          />
        </Menu.Item>
      </Menu.Menu>
    </PaddedContainer>
  </Menu>
)

export default Header
