import React from 'react'
import { Table } from 'semantic-ui-react'
import numeral from 'numeral'

const styles = {
  mainContainer: {
    marginRight: '20%',
    marginLeft: '20%',
    marginTop: 30
  }
}

const numberFormat = '0,0.00'

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
            <Table.HeaderCell textAlign={'center'}>UNIT</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>PRICE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>TOTAL SALES</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>STOCK VALUE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items && items.map(item => {
            const {inventoryQuantity, salesQuantity, returnQuantity, price} = item
            const quantity = inventoryQuantity - salesQuantity + returnQuantity
            const totalSales = salesQuantity * price
            const stockValue = quantity * price
            return (
              <Table.Row key={item._id}>
                <Table.Cell textAlign={'left'}>{item.name}</Table.Cell>
                <Table.Cell textAlign={'center'}>{numeral(inventoryQuantity).format('0,0')}</Table.Cell>
                <Table.Cell textAlign={'center'}>{numeral(salesQuantity).format('0,0')}</Table.Cell>
                <Table.Cell textAlign={'center'}>{numeral(returnQuantity).format('0,0')}</Table.Cell>
                <Table.Cell textAlign={'center'}>{numeral(price).format('0,0')}</Table.Cell>
                <Table.Cell textAlign={'center'}>{item.unit}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱ {numeral(price).format(numberFormat)}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱ {numeral(totalSales).format(numberFormat)}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱ {numeral(stockValue).format(numberFormat)}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell/>
            <Table.HeaderCell/>
            <Table.HeaderCell/>
            <Table.HeaderCell/>
            <Table.HeaderCell/>
            <Table.HeaderCell/>
            <Table.HeaderCell/>
            <Table.HeaderCell
              textAlign={'right'}>₱{numeral(getSummary(items).totalSales).format(numberFormat)}</Table.HeaderCell>
            <Table.HeaderCell
              textAlign={'right'}>₱{numeral(getSummary(items).stockValue).format(numberFormat)}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}

const getSummary = items => {
  const summary = {
    stockValue: 0,
    totalSales: 0
  }
  for (const item of items) {
    const {salesQuantity, price, inventoryQuantity, returnQuantity} = item
    const totalSales = salesQuantity * price
    const quantity = inventoryQuantity - salesQuantity + returnQuantity
    const stockValue = quantity * price
    summary.totalSales += totalSales
    summary.stockValue += stockValue
  }
  return summary
}

export default ItemTable
