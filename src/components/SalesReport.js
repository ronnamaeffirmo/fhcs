import React from 'react'
import { Table } from 'semantic-ui-react'

const SalesReport = ({ inventories }) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Invoice ID</Table.HeaderCell>
        <Table.HeaderCell>Sale Date</Table.HeaderCell>
        <Table.HeaderCell>Customer Name</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Total Amount</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell width={5}>Sales data not yet available</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default SalesReport
