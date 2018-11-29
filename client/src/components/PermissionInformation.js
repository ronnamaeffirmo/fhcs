import React from 'react'
import { Container, Header, Tab } from 'semantic-ui-react'

const styles = {
  informationPanes: {
    marginTop: 20,
    marginBottom: 25
  }
}

// TODO move to constants.js
const informationPanes = [
  {menuItem: 'ALL', render: () => <Tab.Pane>Checking this will override the other selections.</Tab.Pane>},
  {
    menuItem: 'GET',
    render: () => <Tab.Pane>Allow users with this permission to view data from the service endpoint.</Tab.Pane>
  },
  {
    menuItem: 'POST',
    render: () => <Tab.Pane>Allow users with this permission to create new data in the service endpoint.</Tab.Pane>
  },
  {
    menuItem: 'PUT',
    render: () => <Tab.Pane>Allow users with this permission to completely replace existing data in the service
      endpoint.</Tab.Pane>
  },
  {
    menuItem: 'PATCH',
    render: () => <Tab.Pane>Allow users with this permission to modify existing data in the service endpoint</Tab.Pane>
  },
  {
    menuItem: 'DELETE',
    render: () => <Tab.Pane>Allow users with this permission to delete existing data in the service endpoint.</Tab.Pane>
  },
]

const PermissionInformation = () => (
  <Container>
    <Header size={'medium'}>Permission Information</Header>
    <p>Please take a look at the descriptions for each permission.</p>
    <Tab menu={{secondary: true, pointing: true}} panes={informationPanes} style={styles.informationPanes}/>
  </Container>
)

export default PermissionInformation
