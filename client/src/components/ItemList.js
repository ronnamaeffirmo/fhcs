import React, { Component } from 'react'
import { Card, Container, Input, Segment, Message, Grid } from 'semantic-ui-react'
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
        <Segment style={styles.topSegment}>
          <Grid verticalAlign={'middle'} divided>
            <Grid.Row colums={2}>
              <Grid.Column width={12}>
                <Input
                  fluid
                  icon='search'
                  placeholder='Search items here...'
                  onChange={(e) => { filterItems(e.target.value) }}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <NewItemModal />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          
        </Segment>
        <Message style={{ color: 'grey' }}>Click on a card to view reports...</Message>
        <Segment style={styles.bottomSegment}>
          { !items.length && <Message negative>No available items yet</Message>}
          <Card.Group>
            { items.map((item) => (
              <ItemDataCard item={item} key={item._id} actions={{removeItem}} />
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
  // itemSearchField: {
  //   width: '77%'
  // },
  topSegment: {
    boxShadow: 'none'
  },
  bottomSegment: {
    paddingBottom: '3rem'
  }
}

export default ItemList
