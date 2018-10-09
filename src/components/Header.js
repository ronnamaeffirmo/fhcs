import React from 'react'
import { Menu } from 'semantic-ui-react'

const Header = () => (
  <Menu secondary>
    <Menu.Item name='home'/>
    <Menu.Item name='items'/>
    <Menu.Item name='inventory'/>
    <Menu.Item name='sales'/>
  </Menu>
)

export default Header
