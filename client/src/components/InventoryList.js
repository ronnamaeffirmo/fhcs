import React, { Component, Fragment } from 'react'
import { Container, Input, Message, Segment, Table, Button, Divider, Loader } from 'semantic-ui-react'
import InventoryRow from './InventoryRow'

class ItemList extends Component {
  componentDidMount () {
    this.props.getInventories()
  }

  render () {
    let { inventories, removeInventory, filterInventories, filteredInventories, loading } = this.props
    inventories = filteredInventories || inventories || []
    return (
      <Container style={styles.mainContainer}>
        <Segment style={styles.topSegment}>
          <Input
            fluid
            icon='search'
            placeholder='Search inventories here...'
            onChange={(e) => { filterInventories(e.target.value) }}
          />
          <Divider />
          <Message style={{ padding: '0.5rem 1rem' }} size='small' info>
          To add a new inventory, head over to <b>items list</b> and
          click <Button circular icon='add' size='mini' />on an item card
          </Message>
        </Segment>
        <Segment style={styles.bottomSegment}>
          {loading 
            ? <Loader active />
            : <Fragment>
              { inventories && !inventories.length && <Message negative>No available items yet</Message>}
                <Table celled striped selectable>
                  <Table.Header>
                    <Table.Row textAlign='center'>
                      <Table.HeaderCell width={5}>Item</Table.HeaderCell>
                      <Table.HeaderCell width={1}>QTY</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                      <Table.HeaderCell>Received by</Table.HeaderCell>
                      <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    { inventories.map((item) => <InventoryRow key={item._id} item={item} removeInventory={removeInventory} />)}
                  </Table.Body>
                </Table>
            </Fragment>
          }
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
