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
    const { open } = this.state
    const { customer, actions } = this.props
    const { name, address, company, phone, _id } = customer
    const { removeCustomer } = actions

    return (
      <Card fluid style={styles.customerCard}>
        <Card.Content>
          <Card.Header>
            <div style={styles.cardHeader}>
              <div>
                {name}
                <span style={{ marginLeft: '1rem', color: 'darkgrey', fontSize: '14px', fontWeight: 'normal' }}>
                  <Icon name='building outline' />{company}
                </span>
              </div>
              <div>
                <Popup
                  inverted
                  size='mini'
                  content='Click to expand/retract'
                  position='left center'
                  trigger={<Button icon={open ? 'chevron up' : 'chevron down'} circular size='mini' onClick={this.toggleDesc} />}
                />
                <Popup
                  inverted
                  size='mini'
                  content='Edit this customer'
                  position='top center'
                  trigger={<Button as={Link} to={`/customer/${_id}`} circular icon='edit' size='mini' color='teal' />}
                />
                <DeleteConfirmationModal removeElement={removeCustomer} element={{ name, _id }}/>
              </div>
            </div>
          </Card.Header>
          {open &&
            <Card.Description>
              <table border={0} cellSpacing='8px'>
                <tbody>
                  <tr style={{ paddingBottom: '1rem' }}>
                    <td><Icon name='map marker alternate' inverted color='red' /></td>
                    <td style={{ paddingRight: '2em' }}>Address</td>
                    <td>{address || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><Icon name='phone' inverted color='olive' /></td>
                    <td style={{ paddingRight: '2em' }}>Phone</td>
                    <td>{phone || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><Icon name='building outline' inverted color='brown' /></td>
                    <td style={{ paddingRight: '2em' }}>Company</td>
                    <td>{company || 'N/A'}</td>
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
    paddingBottom: 0,
  },
  chevron: {
    paddingLeft: '0.5rem'
  }
}

export default CustomerDataCard
