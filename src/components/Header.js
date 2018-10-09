import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const styles = {
  header: {
    width: '100%',
    position: 'relative',
    color: '#fff',
    lineHeight: '70px',
    minHeight: '70px',
    fontWeight: 'bold'
  }
}

const Header = () => (
  <Menu secondary fixed='top' style={styles.header}>
    <Menu.Item name='home' as={Link} to={'/'}/>
    <Menu.Item name='items' />
    <Menu.Item name='inventory' as={Link} to={'inventories'}/>
    <Menu.Item name='sales' as={Link} to={'sales'}/>
  </Menu>

)

export default Header
