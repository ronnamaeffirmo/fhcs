import React, { Fragment } from 'react'
import { Table, Segment, Loader, Message } from 'semantic-ui-react'

const styles = {
  mainContainer: {
    marginRight: '20%',
    marginLeft: '20%',
    marginTop: 30
  }
}

const ItemTable = props => {
  const {items, loading} = props
  return (
    <div style={styles.mainContainer}>
      { loading 
        ? <Segment vertical padded>
            <Loader active />
          </Segment>
        : <Fragment>
          {items && !items.length && <Message negative>No available items yet</Message>}
          <Table celled sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign={'center'}>Item</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Inventory</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Sales</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Returns</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Available</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Price</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Total Sales</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Stock Value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items && items.map(item => {
                return (
                  <Table.Row key={item._id}>
                    <Table.Cell textAlign={'left'}>{item.name}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{item.quantity > 0 ? item.quantity : 0} {item.unit}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{item.quantity > 0 ? item.quantity : 0} {item.unit}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{item.returnQuantity} {item.unit}</Table.Cell>
                    <Table.Cell textAlign={'center'}>{item.quantity > 0 ? item.quantity : 0} {item.unit}</Table.Cell>
                    <Table.Cell textAlign={'right'}>₱ {item.price.toFixed(2)}</Table.Cell>
                    <Table.Cell textAlign={'right'}>₱ {item.price.toFixed(2)}</Table.Cell>
                    <Table.Cell textAlign={'right'}>₱ {0.00}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell style={{ fontWeight: 'bold' }} textAlign={'center'}>Inventory</Table.HeaderCell>
                <Table.HeaderCell style={{ fontWeight: 'bold' }} textAlign={'center'}>Sales</Table.HeaderCell>
                <Table.HeaderCell style={{ fontWeight: 'bold' }} textAlign={'center'}>Returns</Table.HeaderCell>
                <Table.HeaderCell style={{ fontWeight: 'bold' }} textAlign={'center'}>Available</Table.HeaderCell>
                <Table.HeaderCell style={{ fontWeight: 'bold' }} textAlign={'right'}>Price</Table.HeaderCell>
                <Table.HeaderCell style={{ fontWeight: 'bold' }} textAlign={'right'}>Total Sales</Table.HeaderCell>
                <Table.HeaderCell style={{ fontWeight: 'bold' }} textAlign={'right'}>Stock Value</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Fragment>
      }
    </div>
  )
}

export default ItemTable
