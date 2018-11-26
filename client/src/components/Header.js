import React from 'react'
import { Menu } from 'semantic-ui-react'
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

const Header = () => (
  <Menu secondary fixed='top' style={styles.header} inverted>
    <PaddedContainer>
      <Menu.Item header>FIELDSTONE</Menu.Item>
      <Menu.Item style={styles.menuItem} name='home' as={Link} to={'/'}/>
      <Menu.Item style={styles.menuItem} name='items' as={Link} to={'/items'}/>
      <Menu.Item style={styles.menuItem} name='inventory' as={Link} to={'/inventories'}/>
      <Menu.Item style={styles.menuItem} name='sales' as={Link} to={'/sales'}/>
    </PaddedContainer>
  </Menu>
)

export default Header
