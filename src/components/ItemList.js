import React, { Component } from 'react'
import { Table, Icon, Segment, Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
    let { items, removeItem } = this.props
    items = items || []
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { items.map((item) => {
            const error = (!item.quantity || item.quantity === 0) && true
            const warning = item.quantity < 20 && true
            const status = error ? 'Unavailable' : (warning && 'Low quantity')
            return (
              <Table.Row key={item._id} error={error} warning={warning}>
                <Table.Cell>{status && <Icon name='attention' />}{status}</Table.Cell>
                <Table.Cell>{item.code}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.unit}</Table.Cell>
                <Table.Cell collapsing>
                  <Button.Group>
                    <Menu.Item as={Link} to={`/item/${item._id}`}>
                      <Button icon>
                        <Segment inverted>
                          <Icon inverted color='green' name='edit' />
                        </Segment>
                      </Button>
                    </Menu.Item>
                    <Button.Or />
                    <Button icon onClick={() => removeItem(item._id)}>
                      <Segment inverted>
                        <Icon inverted color='red' name='trash alternate' />
                      </Segment>
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}

export default ItemList
