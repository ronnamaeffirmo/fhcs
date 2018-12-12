import React from 'react'
import { Container, Segment, Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import UserDataCard from './UserDataCard'

const styles = {
  metaRow: {
    paddingTop: 15,
    color: 'green'
  },
  searchField: {
    width: '76%'
  },
  topSegment: {
    boxShadow: 'none'
  },
  mainContainer: {
    width: '768px !important',
    padding: '10px',
    marginTop: '10px'
  },
  searchButton: {
    width: '22%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

const UserList = (props) => {
  const {users, deleteUser} = props
  return (
    <Container style={styles.mainContainer}>
      <Segment style={styles.topSegment}>
        <Input
          placeholder='Search for users here...'
          style={styles.searchField}
        />
        <Button as={Link} to={'/users/new'} style={styles.searchButton}>NEW USER</Button>
      </Segment>
      <Segment>
        {users.map(user => <UserDataCard {...user} deleteUser={deleteUser} />)}
      </Segment>
    </Container>
  )
}
export default UserList
