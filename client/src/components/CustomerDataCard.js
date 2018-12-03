import React, { Component } from 'react'
import { Button, Card, Popup, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import DeleteConfirmationModal from './DeleteConfirmationModal'

class CustomerDataCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleDesc = () => this.setState({ open: !this.state.open })

  render () {
    const { isOpen } = this.state
    const { customer, actions } = this.props
    const { firstname, lastname, address, _id } = customer
    const { removeCustomer } = actions

    return (
      <Card fluid style={styles.customerCard}>
        <Card.Content>
          <Card.Header>
            <div style={styles.cardHeader}>
              <div>
                <span>
                  <Icon name='user outline' style={{ marginRight: '0.5rem' }} />
                  {lastname}, {firstname}
                </span>
                <Popup
                  inverted
                  basic
                  size='tiny'
                  content='Click to expand'
                  position='right center'
                  trigger={<Icon style={styles.chevron} size='small' name={isOpen ? 'chevron up' : 'chevron down'} onClick={this.toggleDesc} />}
                />
              </div>
              <div>
                <Button as={Link} to={`/customer/${customer._id}`} icon='edit' labelPosition='left' content='Edit' size='tiny' color='green' />
                <DeleteConfirmationModal removeElement={removeCustomer} element={{ name: firstname, _id }}/>
              </div>
            </div>
          </Card.Header>
          {isOpen &&
            <Card.Description>
              <table border={0}>
                <tbody>
                  <tr>
                    <td><Icon name='map marker alternate' /></td>
                    <td style={{ paddingRight: '2em' }}>Address</td>
                    <td>{address || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Description>
          }
        </Card.Content>
      </Card>
    )
  }
}

const styles = {
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  customerCard: {
    marginBottom: 0,
    paddingBottom: 0
  },
  chevron: {
    paddingLeft: '0.5rem'
  }
}

export default CustomerDataCard
