import React from 'react'
import { Table } from 'semantic-ui-react'
import moment from 'moment'

const InventoriesReport = ({ inventories }) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Number of units added</Table.HeaderCell>
        <Table.HeaderCell>Encoder</Table.HeaderCell>
        <Table.HeaderCell>Source</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      { inventories
        ? inventories.map(inventory => (
          <Table.Row key={inventory._id}>
            <Table.Cell>{moment(inventory.createdAt).format('MMMM DD, YYYY // hh:mm:ssA')}</Table.Cell>
            <Table.Cell>{inventory.quantity}</Table.Cell>
            <Table.Cell>{inventory.encoder}</Table.Cell>
            <Table.Cell>{inventory.source}</Table.Cell>
          </Table.Row>
        ))
        : <Table.Row>
          <Table.Cell width={4}>Inventory data not available</Table.Cell>
        </Table.Row>
      }
    </Table.Body>
  </Table>
)

export default InventoriesReport
