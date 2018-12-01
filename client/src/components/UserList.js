import React from 'react'
import { Container, Segment, Card, Icon, Grid, Popup, Button, Input } from 'semantic-ui-react'
import { toTitleCase } from '../common/helpers'
import AddCustomerModal from '../containers/AddCustomerContainer'
import { Link } from 'react-router-dom'

const styles = {
  userInformation: {
    marginTop: 30
  },
  userCard: {
    paddingBottom: 20,
    fontSize: 16
  },
  metaRow: {
    paddingTop: 15,
    color: 'green'
  },
  icon: {
    marginRight: 10
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  console.log('USERSLIST USERS', users)
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
        {users.map(user => {
          const {_id: id, firstname, lastname, username, address, role: {title}} = user
          return (
            <Card fluid style={styles.userCard} key={id}>
              <Card.Content>
                <Card.Header style={styles.cardHeader}>
                  <Container>
                    {toTitleCase(firstname + ' ' + lastname)}
                  </Container>
                  <Button color='teal' icon='edit' circular as={Link} to={`/users/update/${id}`}/>
                  <Popup
                    size={'large'}
                    trigger={<Button color='red' icon='delete' circular/>}
                    content={
                      <div>
                        <Button color='green' icon='delete' content='Confirm Delete' onClick={() => {deleteUser(id)}}/>
                      </div>
                    }
                    on='click'
                    flowing
                    position={'bottom right'}
                  />
                </Card.Header>
                <Card.Meta>
                  {`@${username.toLowerCase()} - ${toTitleCase(title)}`}
                </Card.Meta>
                <Card.Description style={styles.userInformation}>
                  <Grid>
                    <Grid.Row columns={1}>
                      <Grid.Column verticalAlign={'middle'}>
                        <Container>
                          <Icon circular inverted color='orange' name='address card outline' style={styles.icon}
                                size={'small'}/>
                          {`${toTitleCase(address)}`}
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                      <Grid.Column verticalAlign={'middle'}>
                        <Container>
                          <Icon circular inverted color='olive' name='mail' style={styles.icon} size={'small'}/>
                          marlon@fieldstone.com.ph
                        </Container>
                      </Grid.Column>
                      <Grid.Column verticalAlign={'middle'}>
                        <Container>
                          <Icon circular inverted color='blue' name='phone' style={styles.icon} size={'small'}/>
                          09178750037
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Description>
              </Card.Content>
            </Card>
          )
        })}
      </Segment>
    </Container>
  )
}
export default UserList
