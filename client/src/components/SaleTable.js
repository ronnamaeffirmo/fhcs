import React from 'react'
import { Table } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import { toTitleCase } from '../common/helpers'
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
  const {filters: {startDate, endDate, status}} = props
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
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign={'center'}>OR #</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>CUSTOMER</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>DATE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>TERM</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>DUE DATE</Table.HeaderCell>
            <Table.HeaderCell textAlign={'center'}>STATUS</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>SUBTOTAL</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>DISCOUNT</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>RETURNED</Table.HeaderCell>
            <Table.HeaderCell textAlign={'right'}>TOTAL</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sales.map(sale => {
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
                <Table.Cell textAlign='right'>₱ {getAggregatedFields(sale.items).subtotal.toFixed(2)}</Table.Cell>
                <Table.Cell textAlign='right'>₱ {getAggregatedFields(sale.items).discount.toFixed(2)}</Table.Cell>
                <Table.Cell textAlign='right'>₱ {getAggregatedFields(sale.items).returned.toFixed(2)}</Table.Cell>
                <Table.Cell textAlign='right'>₱ {getAggregatedFields(sale.items).total.toFixed(2)}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default SaleTable
