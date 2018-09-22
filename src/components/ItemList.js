import React, { Component } from 'react'
import { Table, Icon, Segment, Button, Menu, Container, Input, Header } from 'semantic-ui-react'
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
      <Container style={styles.mainContainer}>
        <Input placeholder='Search items here...' style={styles.itemSearchField}/>
        <Button primary style={styles.searchButton}>Add Item</Button>
        <Container style={styles.itemContainer}>
          <Header as='h2' style={styles.itemContainer.itemHeadline}>Hollow Block 3 x 2</Header>
          <p>13.75 per unit -- 7 units left</p>
          <Container>
            <Button primary style={styles.itemContainer.actionButton}>Add Inventory</Button>
            <Button primary style={styles.itemContainer.actionButton}>Edit Item</Button>
            <Button primary style={styles.itemContainer.actionButton}>Add Sales Record</Button>
          </Container>
        </Container>

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
      </Container>

    )
  }
}

const styles = {
  mainContainer: {
    width: '768px !important',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#F9F9F9'
  },
  itemSearchField: {
    width: '77%',
    marginRight: '10px'
  },
  searchButton: {
    width: '21%'
  },
  itemContainer: {
    height: '200px',
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '15px',
    marginRight: '15px',
    paddingTop: '7px',
    paddingLeft: '30px',
    backgroundColor: 'white',
    itemHeadline: {
      marginTop: '35px'
    },
    actionButton: {
      color: '#fff',
      borderRadius: '0.25em',
      marginRight: '13px',
      padding: '0.767em',
      border: 'none',
      textShadow: '0 1px 1px rgba(0,0,0,.1)'
    }
  }
}

export default ItemList
