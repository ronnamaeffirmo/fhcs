import React, { Component } from 'react'
import { Card, Container, Input } from 'semantic-ui-react'
import ItemDataCard from './ItemDataCard'
import NewItemModal from './../containers/AddItemFormContainer'

// name: String,
// description: String,
// price: Number,
// quantity: Number,
// unit: { type: String, enum: ['kg', 'cubic', 'pcs'] }

class ItemList extends Component {
  componentDidMount () {
    this.props.getItems()
  }

  render () {
    let { items, removeItem } = this.props
    items = items || []
    return (
      <Container style={styles.mainContainer}>
        <Input placeholder='Search items here...' style={styles.itemSearchField} />
        <NewItemModal/>
        <Container style={styles.itemContainer}>
          <Card.Group>
            { items.map((item) => {
              return (
                <ItemDataCard item={item} key={item._id} actions={{removeItem}} />
              )
            })}
          </Card.Group>
        </Container>
      </Container>
    )
  }
}

const styles = {
  mainContainer: {
    width: '768px !important',
    padding: '10px',
    marginTop: '10px'
  },
  itemSearchField: {
    width: '77%'
  },
  itemContainer: {
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '15px',
    marginRight: '15px',
    paddingTop: '7px',
    itemHeadline: {
      marginTop: '35px'
    },
    actionButton: {
      color: '#fff',
      borderRadius: '0.25em',
      marginRight: '7px',
      padding: '0.767em',
      border: 'none',
      textShadow: '0 1px 1px rgba(0,0,0,.1)'
    }
  }
}

export default ItemList
