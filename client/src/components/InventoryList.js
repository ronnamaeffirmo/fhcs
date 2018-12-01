import React, { Component, Fragment } from 'react'
import { Container, Input, Message, Segment, Table, Popup, Label } from 'semantic-ui-react'
import InventoryRow from './InventoryRow'

class ItemList extends Component {
  componentDidMount () {
    this.props.getInventories()
  }

  render () {
    let { inventories, removeInventory, filterInventories, filteredInventories } = this.props
    inventories = filteredInventories || inventories || []
    return (
      <Container style={styles.mainContainer}>
        <Popup
          position='right center'
          content={
            <div>
              To add a new inventory, head over to <b>items list</b> and 
              click <Label size='tiny'>Add Inventory</Label>on an item card
            </div>
          }
          trigger={
            <Segment style={styles.topSegment}>
              <Input
                fluid
                placeholder='Search inventories here...'
                onChange={(e) => { filterInventories(e.target.value) }}
              />
            </Segment>
          }
        />
        <Segment style={styles.bottomSegment}>
          { !inventories.length && <Message negative>No available items yet</Message>}
          <Table celled striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Item</Table.HeaderCell>
                <Table.HeaderCell>QTY</Table.HeaderCell>
                {/* <Table.HeaderCell>Workers</Table.HeaderCell> */}
                {/* <Table.HeaderCell>SRC</Table.HeaderCell> */}
                {/* <Table.HeaderCell>Producer</Table.HeaderCell> */}
                {/* <Table.HeaderCell>Co.</Table.HeaderCell> */}
                {/* <Table.HeaderCell>PO</Table.HeaderCell> */}
                {/* <Table.HeaderCell>Truck Plate #</Table.HeaderCell> */}
                <Table.HeaderCell>Status</Table.HeaderCell>
                {/* <Table.HeaderCell>Notes</Table.HeaderCell> */}
                <Table.HeaderCell>Received by</Table.HeaderCell>
                <Table.HeaderCell width={1}>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { inventories.map((item) => <InventoryRow key={item._id} item={item} />)}
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
