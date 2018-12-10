import React from 'react'
import { Container, Segment, Card, Button, Header, Table, Icon, Input, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { toTitleCase } from '../common/helpers'
import PermissionInformation from './PermissionInformation'

const styles = {
  mainContainer: {
    width: '768px !important',
    padding: '10px',
    marginTop: '10px'
  },
  topSegment: {
    boxShadow: 'none'
  },
  itemSearchField: {
    width: '77%'
  },
  searchButton: {
    width: '21%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

// TODO MODULARIZE

const parsePermissions = (permissions) => {
  // TODO move to common/constants.js
  const params = ['create', 'read', 'update', 'delete']
  const parsedPermissions = new Set()
  permissions.forEach(permission => {
    const service = permission.split(':')[0]
    const param = permission.split(':')[1]
    if (param === '*' || param === 'all') {
      params.forEach(param => {
        parsedPermissions.add(service + ':' + param)
      })
    } else {
      parsedPermissions.add(permission)
    }
  })
  return parsedPermissions
}

const PermissionTableRow = ({services, param, permissionData}) => {
  return (
    <Table.Row>
      <Table.Cell key={param} textAlign={'right'}>{param.label.toUpperCase()}</Table.Cell>
      {services.map(service => {
        const permission = service + ':' + param.slug
        const check = permissionData.has(permission)
        return (
          <Table.Cell key={`${service}:${param} ${check}`} textAlign={'center'}>
            {check && <Icon name={'check'} color={'green'}/>}
            {!check && <Icon name={'delete'} color={'red'}/>}
          </Table.Cell>
        )
      })}
    </Table.Row>
  )
}

const PermissionTable = ({data}) => {
  const services = ['Items', 'Inventory', 'Sales', 'Users', 'Roles', 'Customers'].map(service => service.toLowerCase())

  const params = [
    {slug: 'create', label: 'Create'},
    {slug: 'read', label: 'Read'},
    {slug: 'update', label: 'Update'},
    {slug: 'delete', label: 'Delete'}
  ]
  return (
    <Container>
      <Table compact={'very'}>
        <Table.Header>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell/>
            {services.map(service => <Table.Cell key={service}
                                                 textAlign={'center'}>{service.toUpperCase()}</Table.Cell>)}
          </Table.Row>
          {params.map(param => <PermissionTableRow key={param.slug} services={services} param={param}
                                                   permissionData={data}/>)}
        </Table.Body>
      </Table>
    </Container>
  )
}

const RoleCard = (props) => {
  const {title, permissions, _id: id} = props.role
  return (
      <Card link fluid>
        <Card.Content>
          <Header size={'medium'}>
            {toTitleCase(title)}
          </Header>
          <Container>
            <PermissionTable data={parsePermissions(permissions)}/>
          </Container>
        </Card.Content>
        <Card.Content textAlign={'right'}>
          <Button icon='edit' as={Link} to={`/roles/update/${id}`} content='Edit' size='tiny'
                  color='green'/>
          <Popup
            trigger={<Button color='red' icon='delete' content='Delete Role' size={'tiny'}/>}
            content={<Button color='green' content='Confirm Delete' size={'tiny'}/>}
            on='click'
            position='top right'
          />
        </Card.Content>
      </Card>
  )
}

const RoleList = (props) => {
  const {roles} = props
  return (
    <Container style={styles.mainContainer}>
      <Segment style={styles.topSegment}>
        <Input
          placeholder='Search roles here...'
          style={styles.itemSearchField}
        />
        <Button as={Link} to={'/roles/new'} style={styles.searchButton}>NEW ROLE</Button>
      </Segment>
      <Segment>
        <PermissionInformation/>
      </Segment>
      <Segment style={{marginBottom: 30}}>
        <Card.Group style={{marginTop: 2, marginRight: 2, marginLeft: 2, marginBottom: 2}} centered>
          {roles.map(role => <RoleCard key={role._id} role={role}/>)}
        </Card.Group>
      </Segment>

    </Container>
  )
}

export default RoleList
