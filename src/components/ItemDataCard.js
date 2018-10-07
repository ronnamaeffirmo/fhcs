import React from 'react'
import { Button, Card, Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DeleteConfirmationModal from './DeleteConfirmationModal'

const itemDataCard = ({item, actions}) => {
  const {quantity, code, name, price, description} = item
  const {removeItem} = actions
  return (
    <Card style={styles.itemCard} centered>
      <Card.Content>
        <div style={{float: 'right'}}>
          <span style={styles.quantityHeading}>{quantity} pcs</span>
        </div>
        <Card.Header>{name}<span style={styles.code}>{code}</span></Card.Header>

        <Card.Meta>₱{price} per unit</Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button primary style={styles.actionButton}>Add Inventory</Button>

          <div style={{float: 'right'}}>
            <Menu.Item as={Link} to={`/item/${item._id}`}>
              <Button color='green' style={styles.actionButton}><Icon
                name='edit'/>Edit</Button>
            </Menu.Item>
            <DeleteConfirmationModal removeItem={removeItem} item={item}/>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

const styles = {
  actionButton: {
    color: '#fff',
    borderRadius: '0.25em',
    marginRight: '7px',
    padding: '0.767em',
    border: 'none',
    textShadow: '0 1px 1px rgba(0,0,0,.1)'
  },
  quantityHeading: {
    fontWeight: 'bold',
    fontSize: '13px'
  },
  code: {
    fontSize: '10px',
    paddingLeft: '3px',
    display: 'inline-block',
    verticalAlign: 'top',
    lineHeight: 'normal'
  },
  itemCard: {
    width: '350px'
  }
}
export default itemDataCard
