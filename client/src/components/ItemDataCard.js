import React, { Component } from 'react'
import { Button, Card, Popup, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

import DeleteConfirmationModal from './DeleteConfirmationModal'
import AddNewInventory from '../containers/AddInventoryContainer'

class ItemDataCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggleDesc = this.toggleDesc.bind(this)
  }

  toggleDesc () {
    const { isOpen } = this.state
    if (isOpen) {
      this.setState({ isOpen: false })
    } else {
      this.setState({ isOpen: true })
    }
  }

  render () {
    const { isOpen } = this.state
    const { item, actions } = this.props
    const { quantity, code, name, price, description, unit } = item
    const { removeItem } = actions

    return (
      <Card fluid style={styles.itemCard}>
        <Popup
          inverted
          content='Click to see reports'
          position='right center'
          trigger={
            <Card.Content as={Link} to={`/item/${item._id}/reports`}>
              <Card.Header>
                <div style={styles.cardHeader}>
                  <span>{name}</span>
                  <span style={styles.quantityText}>&bull; {quantity} {unit}</span>
                </div>
                <Label size='small' tag attached='top right' style={styles.cardHeader.label}>
                  &#8369; {numeral(price).format('0,0')} per unit
                </Label>
              </Card.Header>
              {isOpen &&
                <Card.Description>
                  <table border={0}>
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
                  </table>
                </Card.Description>
              }
            </Card.Content>
          }
        />
        <Card.Content extra style={styles.cardExtra}>
          <Button onClick={this.toggleDesc} size='tiny' circular icon={isOpen ? 'chevron up' : 'chevron down'} />
          <AddNewInventory item={item}/>
          <div style={{ float: 'right' }}>
            <Button as={Link} to={`/item/${item._id}`} icon='edit' labelPosition='left' content='Edit' size='tiny' color='green' />
            <DeleteConfirmationModal removeElement={removeItem} element={item}/>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const styles = {
  cardHeader: {
    marginRight: '4em',
    label: {
      margin: '0.5rem',
      backgroundColor: '#f8ed62'
    }
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
  cardExtra: {
    padding: '6px 4px 6px 6px'
  }
}

export default ItemDataCard
