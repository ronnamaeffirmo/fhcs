import React from 'react'
import { Table } from 'semantic-ui-react'

const styles = {
  mainContainer: {
    marginRight: '20%',
    marginLeft: '20%',
    marginTop: 30
  }
}

const ItemTable = props => {
  const {items} = props
  return (
    <div style={styles.mainContainer}>
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign={'center'}>ITEM</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>INVENTORY</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>SALES</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>RETURNS</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>AVAILABLE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>PRICE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>TOTAL SALES</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>STOCK VALUE</Table.HeaderCell>
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
            <Table.HeaderCell textAlign={'center'}>INVENTORY</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>SALES</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>RETURNS</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>AVAILABLE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>PRICE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>TOTAL SALES</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>STOCK VALUE</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}

export default ItemTable
