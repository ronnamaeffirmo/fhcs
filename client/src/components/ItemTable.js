import React from 'react'
import { Divider, Grid, Input, Label, Message, Segment, Table } from 'semantic-ui-react'
import numeral from 'numeral'
import NewItemModal from '../containers/AddItemFormContainer'

const styles = {
  mainContainer: {
    marginRight: '20%',
    marginLeft: '20%',
    marginTop: 30
  },
  topSegment: {
    boxShadow: 'none'
  },
}

const numberFormat = '0,0.00'

const ItemTable = props => {
  let {items, filterItems, filteredItems} = props
  items = filteredItems || items || []
  return (
    <div style={styles.mainContainer}>
      <Segment style={styles.topSegment}>
        <Grid verticalAlign={'middle'} divided>
          <Grid.Row colums={2}>
            <Grid.Column width={12}>
              <Input
                fluid
                icon='search'
                placeholder='Search items here...'
                onChange={(e) => { filterItems(e.target.value) }}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <NewItemModal/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Divider/>
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
                <Table.Cell textAlign={'right'}>₱{numeral(price).format(numberFormat)}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{numeral(totalSales).format(numberFormat)}</Table.Cell>
                <Table.Cell textAlign={'right'}>₱{numeral(stockValue).format(numberFormat)}</Table.Cell>
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
