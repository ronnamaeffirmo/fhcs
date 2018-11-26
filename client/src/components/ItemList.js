import React, { Component } from 'react'
import { Card, Container, Input, Segment } from 'semantic-ui-react'
import ItemDataCard from './ItemDataCard'
import NewItemModal from './../containers/AddItemFormContainer'

class ItemList extends Component {
  componentDidMount () {
    this.props.getItems()
  }

  render () {
    let { items, removeItem, filterItems, filteredItems } = this.props
    items = filteredItems || items || []
    return (
      <Container style={styles.mainContainer}>
        <Segment style={styles.segment}>
          <Input
            placeholder='Search items here...'
            style={styles.itemSearchField}
            onChange={(e) => { filterItems(e.target.value) }}
          />
          <NewItemModal/>
        </Segment>
        <Segment style={styles.segment}>
          <Card.Group>
            { items.map((item) => {
              return (
                <ItemDataCard item={item} key={item._id} actions={{removeItem}} />
              )
            })}
          </Card.Group>
        </Segment>
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
  segment: {
    boxShadow: 'none'
  }
}

export default ItemList
