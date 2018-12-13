import React from 'react'
import { Table } from 'semantic-ui-react'

const styles = {
  mainContainer: {
    marginRight: '20%',
    marginLeft: '20%',
    marginTop: 30
  }
}

const InventoryTable = props => {
  const {inventories} = props
//   console.log("INVENTORIES:", inventories)
  return (
    <div style={styles.mainContainer}>
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign={'center'}>ITEM</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>QUANTITY</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>STATUS</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>TRUCK PLATE NUMBER</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>PRODUCER</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>COMPANY</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>PHONE NUMBER</Table.HeaderCell>
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
    </div>
  )
}

export default InventoryTable
