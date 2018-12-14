import React, { Fragment } from 'react'
import { Table, Segment, Loader, Message, Divider } from 'semantic-ui-react'
import moment from 'moment'
import _ from 'lodash'
import numeral from 'numeral'
import SaleHeader from './SaleHeader'

const numberFormat = '0,0.00'
const styles = {
  mainContainer: {
    marginRight: '7%',
    marginLeft: '7%',
    marginTop: 30
  }
}

const getAggregatedFields = items => {
  let subtotal = 0
  let discount = 0
  let returned = 0
  for (const item of items) {
    subtotal += item.quantity * item.price
    discount += item.discount
    returned += item.returnQuantity * item.price
  }
  const total = subtotal - discount - returned
  return {subtotal, total, discount, returned}
}

const getSummary = sales => {
  const summary = {
    subtotal: 0,
    discount: 0,
    returned: 0,
    total: 0
  }
  for (const sale of sales) {
    const saleSummary = getAggregatedFields(sale.items)
    const {subtotal, total, discount, returned} = saleSummary
    summary.subtotal += subtotal
    summary.total += total
    summary.discount += discount
    summary.returned += returned
  }
  return summary
}

const SaleTable = props => {
  const {filters: {startDate, endDate, status}, loading, filteredSales} = props
  let {sales} = props
  sales = filteredSales || sales || []
  if (sales.length > 0) {
    if (status && status !== 'none') {
      sales = sales.filter(sale => sale.status === status)
    }
    if (startDate) {
      sales = sales.filter(sale => moment(sale.date) >= moment(startDate))
    }
    if (endDate) {
      sales = sales.filter(sale => moment(sale.date) <= moment(endDate))
    }
  }
  return (
    <div style={styles.mainContainer}>
      <SaleHeader {...props} />
      <Divider />
      { loading 
        ? <Segment vertical padded='very'>
            <Loader active />
          </Segment>
        : <Fragment>
          {sales && !sales.length && <Message negative>No available sales yet</Message>}
          <Table celled sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign={'center'}>OR #</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Customer</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Date</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Term</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Due Date</Table.HeaderCell>
                <Table.HeaderCell textAlign={'center'}>Status</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Subtotal</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Discout</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Returned</Table.HeaderCell>
                <Table.HeaderCell textAlign={'right'}>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sales.map(sale => {
                return (
                  <Table.Row key={sale._id}>
                    <Table.Cell textAlign='center'>{sale.officialReceipt}</Table.Cell>
                    <Table.Cell textAlign='center'>{sale.customer.company ? sale.customer.company : sale.customer.name}</Table.Cell>
                    <Table.Cell textAlign='center'>{moment(sale.date).format('MMMM DD, YYYY')}</Table.Cell>
                    <Table.Cell textAlign='center'>{sale.term} days</Table.Cell>
                    <Table.Cell textAlign='center'>{moment(sale.date).add(_.parseInt(sale.term), 'days').format('MMMM DD, YYYY')}</Table.Cell>
                    <Table.Cell textAlign='center'>{_.capitalize(sale.status)}</Table.Cell>
                    <Table.Cell textAlign='right'>₱ {numeral(getAggregatedFields(sale.items).subtotal).format(numberFormat)}</Table.Cell>
                    <Table.Cell textAlign='right'>₱ {numeral(getAggregatedFields(sale.items).discount).format(numberFormat)}</Table.Cell>
                    <Table.Cell textAlign='right'>₱ {numeral(getAggregatedFields(sale.items).returned).format(numberFormat)}</Table.Cell>
                    <Table.Cell textAlign='right' color={'red'}>₱ {numeral(getAggregatedFields(sale.items).total).format(numberFormat)}</Table.Cell>
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
                <Table.HeaderCell textAlign='right'>₱ {numeral(getSummary(sales).subtotal).format(numberFormat)}</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>₱ {numeral(getSummary(sales).discount).format(numberFormat)}</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>₱ {numeral(getSummary(sales).returned).format(numberFormat)}</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>₱ {numeral(getSummary(sales).total).format(numberFormat)}</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Fragment>
      }
    </div>
  )
}

export default SaleTable
