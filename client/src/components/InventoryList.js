import React, { Component } from 'react'
import { Card, Container, Input, Segment, Message } from 'semantic-ui-react'
import ItemDataCard from './ItemDataCard'

class ItemList extends Component {
  componentDidMount () {
    this.props.getInventories()
  }

  render () {
    let { inventories, removeInventory, filterInventories, filteredInventories } = this.props
    inventories = filteredInventories || inventories || []
    return (
      <Container style={styles.mainContainer}>
        <Segment style={styles.topSegment}>
          <Input
            fluid
            placeholder='Search inventories here...'
            onChange={(e) => { filterInventories(e.target.value) }}
          />
        </Segment>
        <Segment style={styles.bottomSegment}>
          { !inventories.length && <Message negative>No available items yet</Message>}
          <Card.Group>
            { inventories.map((item) => (
              <div key={item._id}>{item._id}</div>
              // <ItemDataCard item={item} key={item._id} actions={{removeItem}} />
            ))}
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
  topSegment: {
    boxShadow: 'none'
  },
  bottomSegment: {
    paddingBottom: '3rem'
  }
}

export default ItemList
