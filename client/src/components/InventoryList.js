import React, { Component } from 'react';
import { Container, Input, Message, Segment, Table } from 'semantic-ui-react';

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
          <Table compact celled size='small' striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Item</Table.HeaderCell>
                <Table.HeaderCell>QTY</Table.HeaderCell>
                <Table.HeaderCell>Workers</Table.HeaderCell>
                <Table.HeaderCell>SRC</Table.HeaderCell>
                <Table.HeaderCell>Producer</Table.HeaderCell>
                <Table.HeaderCell>Co.</Table.HeaderCell>
                <Table.HeaderCell>PO</Table.HeaderCell>
                <Table.HeaderCell>Truck Plate #</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell>Received by</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { inventories.map((item) => (
                <Table.Row key={item._id}>
                  {console.log('item', item)}
                  <Table.Cell>{item.itemName}</Table.Cell>
                </Table.Row>
                // <ItemDataCard item={item} key={item._id} actions={{removeItem}} />
              ))}
            </Table.Body>
          </Table>
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
