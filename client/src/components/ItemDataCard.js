import React, { Component } from 'react'
import { Button, Card, Popup, Label, Icon, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

import DeleteConfirmationModal from './DeleteConfirmationModal'

class ItemDataCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleDesc = () => this.setState({ isOpen: !this.state.isOpen })

  render () {
    const { isOpen } = this.state
    const { item, actions } = this.props
    const { quantity, code, name, price, description, unit } = item
    const { removeItem } = actions

    return (
      <Card fluid style={styles.itemCard}>
        <Popup
          inverted
          size='tiny'
          content='Click to see reports'
          position='left center'
          trigger={
            <Card.Content style={{ padding: '1em 1em 0.5em 1em' }} as={Link} to={`/item/${item._id}/reports`}>
              <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span>{name}</span>
                  <span style={styles.quantityText}>&bull; {quantity} {unit}</span>
                </div>
                <div>
                  <Label ribbon='right'StatisticLabel attachedStatisticLabel style={styles.ribbon}>
                    &#8369; {numeral(price).format('0,0')} /unit
                  </Label>
                </div>
              </Card.Header>
              {isOpen &&
                <Card.Description>
                  <table border={0} cellSpacing='4px'>
                    <tbody>
                      <tr>
                        <td><Icon name='barcode' /></td>
                        <td style={{ paddingRight: '2em' }}>Item code</td>
                        <td>{code || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><Icon name='info circle' /></td>
                        <td style={{ paddingRight: '2rem' }}>Description</td>
                        <td>{description}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Description>
              }
            </Card.Content>
          }
        />
        <Card.Content extra style={styles.cardExtra}>
          <div style={styles.flexit}>
            <div style={{ fontSize: '13px' }}>Expand card to see item description</div>
            <div style={{ float: 'right' }}>
              <Popup
                inverted
                size='mini'
                content='View more info'
                position='left center'
                trigger={<Button onClick={this.toggleDesc} size='mini' circular icon={isOpen ? 'chevron up' : 'chevron down'} />}
              />
              <Popup
                inverted
                size='mini'
                content='Add inventory'
                position='bottom center'
                trigger={<Button as={Link} to={`/inventories/add/${item._id}`} circular icon='add' size='mini' />}
              />
              <Popup
                inverted
                size='mini'
                content='Edit item'
                position='bottom center'
                trigger={<Button as={Link} to={`/item/${item._id}`} icon='edit' circular size='mini' color='teal' />}
              />
              <DeleteConfirmationModal removeElement={removeItem} element={item}/>
            </div>
          </div>
          
          {/* bak */}
          {/* <Message attached style={{ padding: '0.5rem' }} color='grey' compact size='tiny'>
            <span>
              <span style={{ marginRight: '8px' }}><Icon name='chevron down' /> expand</span>
              <span style={{ marginRight: '8px' }}><Icon name='add' /> add inventory</span>
              <span style={{ marginRight: '8px' }}><Icon name='edit' /> edit</span>
              <span style={{ marginRight: '8px' }}><Icon name='trash alternate outline' /> delete</span>
            </span>
          </Message> */}
          
          {/* bak */}
          {/* <Popup
            inverted
            size='mini'
            content='View more info'
            position='left center'
            trigger={<Button onClick={this.toggleDesc} size='mini' circular icon={isOpen ? 'chevron up' : 'chevron down'} />}
          />
          <Button as={Link} to={`/inventories/add/${item._id}`} size='mini'>Add Inventory</Button>
          <div style={{ float: 'right' }}>
            <Button as={Link} to={`/item/${item._id}`} icon='edit' circular size='mini' color='teal' />
            <DeleteConfirmationModal removeElement={removeItem} element={item}/>
          </div> */}
        </Card.Content>
      </Card>
    )
  }
}

const styles = {
  ribbon: {
    // position: 'absolute',
    backgroundColor: '#f8ed62',
  },
  quantityText: {
    marginLeft: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'normal',
    color: 'grey'
  },
  itemCard: {
    marginBottom: '0.5rem'
  },
  flexit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardExtra: {
    padding: '6px 4px 6px 1rem'
  }
}

export default ItemDataCard
