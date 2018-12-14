import React, { Fragment } from 'react'
import { Table, Segment, Loader, Message } from 'semantic-ui-react'
import moment from 'moment'
import { toTitleCase } from '../common/helpers'
import numeral from 'numeral'
import SaleHeader from './SaleHeader'

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

const SaleTable = props => {
  const {filters: {startDate, endDate, status}, loading} = props
  let {sales} = props
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
                const numberFormat = '0,0.00'
                return (
                  <Table.Row key={sale._id}>
                    <Table.Cell textAlign='center'>{sale.officialReceipt}</Table.Cell>
                    <Table.Cell
                      textAlign='center'>{sale.customer.company ? sale.customer.company : sale.customer.name}</Table.Cell>
                    <Table.Cell textAlign='center'>{moment(sale.date).format('MMMM DD, YYYY')}</Table.Cell>
                    <Table.Cell textAlign='center'>{sale.term} days</Table.Cell>
                    <Table.Cell
                      textAlign='center'>{moment(sale.date).add(parseInt(sale.term), 'days').format('MMMM DD, YYYY')}</Table.Cell>
                    <Table.Cell textAlign='center'>{toTitleCase(sale.status)}</Table.Cell>
                    <Table.Cell textAlign='right'>₱ {numeral(getAggregatedFields(sale.items).subtotal).format(numberFormat)}</Table.Cell>
                    <Table.Cell textAlign='right'>₱ {numeral(getAggregatedFields(sale.items).discount).format(numberFormat)}</Table.Cell>
                    <Table.Cell textAlign='right'>₱ {numeral(getAggregatedFields(sale.items).returned).format(numberFormat)}</Table.Cell>
                    <Table.Cell textAlign='right'>₱ {numeral(getAggregatedFields(sale.items).total).format(numberFormat)}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Fragment>
      }
    </div>
  )
}

export default SaleTable
