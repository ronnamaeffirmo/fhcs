import React, { Component } from 'react'
import { Button, Card, Popup, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

class ItemDataCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleDesc = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    const { isOpen } = this.state
    const { item, actions } = this.props
    const { salesQuantity, returnQuantity, inventoryQuantity, code, name, price, description, unit } = item
    const { removeItem } = actions
    const quantity = inventoryQuantity - salesQuantity + returnQuantity
    return (
      <Card link fluid style={styles.itemCard}>
        <Popup
          inverted
          size='tiny'
          content='Click to see reports'
          position='left center'
          trigger={
            <Card.Content style={{ padding: '1em 1em 0.5em 1em' }} as={Link} to={`/items/${item._id}/report`}>
              <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span>{name}</span>
                  <span style={styles.quantityText}>&bull; {quantity} {unit}</span>
                </div>
                <div>
                  <Label ribbon='right' style={styles.ribbon}>
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
                trigger={<Button onClick={this.toggleDesc} size='mini' circular
                  icon={isOpen ? 'chevron up' : 'chevron down'} />}
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
                trigger={<Button as={Link} to={`/items/update/${item._id}`} icon='edit' circular size='mini'
                  color='teal' />}
              />
              <Popup
                size={'mini'}
                trigger={<Button icon='trash alternate outline' circular size='mini' color='red' />}
                content={
                  <div>
                    <Button size='tiny' color='green' icon='delete' content='Confirm Delete' onClick={(e) => {
                      e.preventDefault()
                      removeItem(item._id)
                    }} />
                  </div>
                }
                on='click'
                flowing
                position={'bottom right'}
              />
            </div>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

const styles = {
  ribbon: {
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
