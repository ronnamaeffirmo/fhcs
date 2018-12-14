import React, { Fragment } from 'react'
import { Table, Segment, Loader, Message, Divider, Grid, Input, Label } from 'semantic-ui-react'
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
  let {items, filterItems, filteredItems, loading} = props
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
                <Table.HeaderCell textAlign={'center'}>Unit</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Price</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Total Sales</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Stock Value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items && items.map(item => {
                const {inventoryQuantity, salesQuantity, returnQuantity, price} = item
                const quantity = inventoryQuantity - salesQuantity + returnQuantity
                const totalSales = salesQuantity * price
                const stockValue = quantity * price

                console.log('salesQuantity', salesQuantity)
                console.log('price', price)

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
                <Table.HeaderCell textAlign={'right'}>
                  ₱ {numeral(getSummary(items).totalSales).format(numberFormat)}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>
                  ₱ {numeral(getSummary(items).stockValue).format(numberFormat)}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Fragment>
      }
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
