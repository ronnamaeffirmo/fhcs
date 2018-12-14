import React, { Fragment } from 'react'
import { Container, Segment, Button, Input, Grid, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import UserDataCard from './UserDataCard'

const styles = {
  metaRow: {
    paddingTop: 15,
    color: 'green'
  },
  searchField: {
    // width: '76%'
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
    // width: '22%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

const UserList = (props) => {
  const {users, deleteUser, loading} = props
  return (
    <Container style={styles.mainContainer}>
      <Segment style={styles.topSegment}>
        <Grid verticalAlign={'middle'} divided>
          <Grid.Row colums={2}>
            <Grid.Column width={12}>
              <Input
                fluid
                icon='search'
                placeholder='Search for users here...'
                style={styles.searchField}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button fluid as={Link} to={'/users/new'} style={styles.searchButton}>NEW USER</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        {loading 
          ? <Segment vertical padded>
              <Loader active />
            </Segment>
          : <Fragment>
            {users && !users.length && <Message negative>No users yet</Message>}
            {users.map(user => <UserDataCard key={user._id} {...user} deleteUser={deleteUser} />)}
          </Fragment>
        }
      </Segment>
    </Container>
  )
}
export default UserList
