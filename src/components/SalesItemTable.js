import React from 'react'
import { Table, Modal, Button } from 'semantic-ui-react'

const SalesItemTable = ({ items }) => (
  <Modal trigger={<Button color='green' >View Items</Button>} centered={false} >
    <Modal.Header> Items </Modal.Header>
    <Modal.Content>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Item Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Sub Total</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.subtotal}</Table.Cell>
              <Table.Cell>{item.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Modal.Content>
  </Modal>
)

export default SalesItemTable
