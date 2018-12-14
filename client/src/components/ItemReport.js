import React from 'react'
import { Container, Statistic, Segment, Table, Tab, Button, Divider } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import _ from 'lodash'
import numeral from 'numeral'

const styles = {
  mainContainer: {
    marginTop: '10px'
  },
  statisticSegment: {
    padding: '40px 240px 40px 240px'
  }
}

const panes = ({sales, inventories}) => [
  {
    menuItem: 'Sales',
    render: () => <Tab.Pane attached={false}><SalesTable sales={sales}/></Tab.Pane>
  },
  {
    menuItem: 'Inventories',
    render: () => <Tab.Pane attached={false}><InventoryTable inventories={inventories}/></Tab.Pane>
  },
]

const getStats = sales => {
  let stats = {total: 0, returnTotal: 0, sold: 0, returned: 0}
  for (const sale of sales) {
    for (const item of sale.items) {
      stats.total += item.price * (item.quantity)
      stats.returnTotal += item.price * (item.returnQuantity)
      stats.sold += item.quantity
      stats.returned += item.returnQuantity
    }
  }
  return {
    ...stats,
    total: parseFloat(stats.total).toFixed(2),
    returnTotal: parseFloat(stats.returnTotal).toFixed(2)
  }
}

const InventoryTable = ({inventories}) => {
  return (
    <div style={styles.mainContainer}>
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign={'center'}>DATE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>SOURCE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>QUANTITY</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>STATUS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {inventories && inventories.map(inventory => {
            return (
              <Table.Row key={inventory._id}>
                <Table.Cell textAlign={'center'}>{moment(inventory.date).format('MMMM DD, YYYY') || 'N/A'}</Table.Cell>
                <Table.Cell textAlign={'center'}>{_.capitalize(inventory.source) || 'N/A'}</Table.Cell>
                <Table.Cell textAlign={'center'}>{inventory.quantity > 0 ? inventory.quantity : 'N/A'} </Table.Cell>
                <Table.Cell
                  textAlign={'center'}>{_.capitalize(inventory.status.replace('_', ' ')) || 'N/A'}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

const ItemReport = props => {
  if (props.item && !props.loading) {
    const {item: {sales, inventories}} = props
    const {sold, total, returned, returnTotal} = getStats(sales)
    return (
      <Container style={styles.mainContainer}>
        <Container>
          <Link to={'/items'}><Button color={'grey'} content={'Back to Items'} icon={'arrow left'}
                                      labelPosition={'left'}/></Link>
          <Divider/>
        </Container>
        <Segment>
          <Statistic.Group widths='two'>
            <Statistic color={'blue'}>
              <Statistic.Value>{numeral(sold).format('0,0')}</Statistic.Value>
              <Statistic.Label>AMOUNT SOLD</Statistic.Label>
            </Statistic>
            <Statistic color={'green'}>
              <Statistic.Value>
                ₱{numeral(total).format('0,0.00')}
              </Statistic.Value>
              <Statistic.Label>TOTAL SALES</Statistic.Label>
            </Statistic>
            <Statistic color={'grey'}>
              <Statistic.Value>{numeral(returned).format('0,0')}</Statistic.Value>
              <Statistic.Label>AMOUNT RETURNED</Statistic.Label>
            </Statistic>
            <Statistic color={'red'}>
              <Statistic.Value>
                ₱{numeral(returnTotal).format('0,0.00')}
              </Statistic.Value>
              <Statistic.Label>TOTAL RETURNS</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>
        <Container>
          <Tab menu={{secondary: true}} panes={panes({sales, inventories})}/>
        </Container>
      </Container>
    )
  }
  return <Loader/>
}

const SalesTable = props => {
  const {sales} = props
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign={'center'}>OR</Table.HeaderCell>
          <Table.HeaderCell textAlign={'center'}>DATE</Table.HeaderCell>
          <Table.HeaderCell textAlign={'center'}>PRICE</Table.HeaderCell>
          <Table.HeaderCell textAlign={'center'}>QUANTITY</Table.HeaderCell>
          <Table.HeaderCell textAlign={'center'}>RETURN QTY</Table.HeaderCell>
          <Table.HeaderCell textAlign={'center'}>SALE AMOUNT</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sales && sales.map(sale => {
          return sale.items.map((item, index) => {
            const total = item.price * (item.quantity - item.returnQuantity)
            const {officialReceipt, date} = sale
            const {price, quantity, returnQuantity} = item
            return (
              <Table.Row key={index}>
                <Table.Cell textAlign={'center'}>{officialReceipt}</Table.Cell>
                <Table.Cell textAlign={'center'}>{moment(date).format('MMMM DD, YYYY')}</Table.Cell>
                <Table.Cell textAlign={'center'}>₱{numeral(price).format('0,0.00')}</Table.Cell>
                <Table.Cell textAlign={'center'}>{numeral(quantity).format('0,0')} {item.unit}</Table.Cell>
                <Table.Cell textAlign={'center'}>{numeral(returnQuantity).format('0,0')} {item.unit}</Table.Cell>
                <Table.Cell
                  textAlign={'right'}>₱{numeral(total).format('0,0.00')}</Table.Cell>
              </Table.Row>
            )
          })
        })}
      </Table.Body>
    </Table>
  )
}

export default ItemReport
