import React from 'react'
import { Container, Statistic, Segment, Table, Tab, Icon, Button, Divider } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const styles = {
  mainContainer: {
    marginTop: '10px'
  },
  statisticSegment: {
    padding: '40px 240px 40px 240px'
  }
}

const panes = ({sales, inventories}) => [
  {menuItem: 'Sales', render: () => <Tab.Pane attached={false}><SalesTable sales={sales}/></Tab.Pane>},
  {menuItem: 'Inventories', render: () => <Tab.Pane attached={false}>Inventories</Tab.Pane>},
]

const getSalesTotal = sales => {
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

const ItemReport = props => {
  if (props.item && !props.loading) {
    const {item: {sales}} = props
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
              <Statistic.Value>{getSalesTotal(sales).sold}</Statistic.Value>
              <Statistic.Label>AMOUNT SOLD</Statistic.Label>
            </Statistic>
            <Statistic color={'green'}>
              <Statistic.Value>
                ₱{getSalesTotal(sales).total}
              </Statistic.Value>
              <Statistic.Label>TOTAL SALES</Statistic.Label>
            </Statistic>
            <Statistic color={'grey'}>
              <Statistic.Value>{getSalesTotal(sales).returned}</Statistic.Value>
              <Statistic.Label>AMOUNT RETURNED</Statistic.Label>
            </Statistic>
            <Statistic color={'red'}>
              <Statistic.Value>
                ₱{getSalesTotal(sales).returnTotal}
              </Statistic.Value>
              <Statistic.Label>TOTAL RETURNS</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>
        <Container>
          <Tab menu={{secondary: true}} panes={panes({sales: props.item.sales})}/>
        </Container>
      </Container>
    )
  }
  return <Loader />
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
            return (
              <Table.Row key={index}>
                <Table.Cell textAlign={'center'}>{sale.officialReceipt}</Table.Cell>
                <Table.Cell textAlign={'center'}>{moment(sale.date).format('MMMM DD, YYYY')}</Table.Cell>
                <Table.Cell textAlign={'center'}>₱{item.price}</Table.Cell>
                <Table.Cell textAlign={'center'}>{item.quantity} {item.unit}</Table.Cell>
                <Table.Cell textAlign={'center'}>{item.returnQuantity} {item.unit}</Table.Cell>
                <Table.Cell
                  textAlign={'right'}>₱{parseFloat(item.price * (item.quantity - item.returnQuantity)).toFixed(2)}</Table.Cell>
              </Table.Row>
            )
          })
        })}
      </Table.Body>
    </Table>
  )
}

export default ItemReport
