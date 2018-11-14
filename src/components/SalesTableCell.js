import React from 'react'
import { Table, Button } from 'semantic-ui-react'

const SalesTableCell = ({ itemLists, removeFromList, grandTotal, input, meta: { touched, error }, ...custom }) => (
  <Table celled {...input}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Item Name</Table.HeaderCell>
        <Table.HeaderCell>Item Description</Table.HeaderCell>
        <Table.HeaderCell>Item Price</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Subtotal</Table.HeaderCell>
        <Table.HeaderCell>Discount</Table.HeaderCell>
        <Table.HeaderCell>Total Amount</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {/* {console.log(itemLists)} */}
      {itemLists.map((item, key) => (
        <Table.Row key={item._id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.description}</Table.Cell>
          <Table.Cell>{item.price}</Table.Cell>
          <Table.Cell>{item.quantity}</Table.Cell>
          <Table.Cell>{item.subtotal}</Table.Cell>
          <Table.Cell>{item.discount}</Table.Cell>
          <Table.Cell>{item.total}</Table.Cell>
          <Table.Cell>
            <Button 
              onClick={(e) => removeFromList(itemLists, item)} 
              negative>Remove
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell><b>Total: {grandTotal}</b> </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default SalesTableCell
