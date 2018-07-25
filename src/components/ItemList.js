import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

// code: String,
// name: String,
// description: String,
// price: Number,
// quantity: Number,
// unit: { type: String, enum: ['kg', 'cubic', 'pcs'] }

class ItemList extends Component {
  componentDidMount () {
    this.props.getItems()
  }

  render () {
    let { items } = this.props
    items = items || { data: [] }

    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { items.data.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>{item.code}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.unit}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export default ItemList
