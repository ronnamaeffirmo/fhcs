import React, { Fragment } from 'react'
import { Table, Segment, Loader, Message } from 'semantic-ui-react'

const styles = {
  mainContainer: {
    marginRight: '20%',
    marginLeft: '20%',
    marginTop: 30
  }
}

const InventoryTable = props => {
  const {inventories, loading} = props
  return (
    <div style={styles.mainContainer}>
      { loading 
        ? <Segment vertical padded>
            <Loader active />
          </Segment>
        : <Fragment>
          {inventories && !inventories.length && <Message negative>No available inventory yet</Message>}
          <Table celled sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign={'center'}>Item</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Quantity</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Status</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Truck Plate #</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Producer</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Company</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Phone #</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {inventories && inventories.map(inventory => {
                return (
                  <Table.Row key={inventory._id}>
                    <Table.Cell textAlign={'left'}>{inventory.itemName}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{inventory.quantity > 0 ? inventory.quantity : 'N/A'} </Table.Cell>
                    <Table.Cell textAlign={'center'}>{inventory.status || 'N/A'}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{inventory.truckPlateNumber || 'N/A'}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{inventory.producer || 'N/A'}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{inventory.company || 'N/A'}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{inventory.poNumber || 'N/A'}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Fragment>
      }
    </div>
  )
}

export default InventoryTable
