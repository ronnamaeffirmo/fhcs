import React from 'react'
import { Dropdown, Table, Checkbox, Input, Divider } from 'semantic-ui-react'
import saleStatus from '../common/constants/saleStatus'
import { DateInput } from 'semantic-ui-calendar-react'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'
import { toTitleCase } from '../common/helpers'
import { Form } from 'semantic-ui-react/dist/commonjs/collections/Form/Form'

const styles = {
  mainContainer: {
    marginRight: '7%',
    marginLeft: '7%',
    marginTop: 30
  },
  filters: {
    display: 'inline'
  },
  filterField: {
    display: 'inline-block',
    marginRight: 7,
    height: 38
  },
  dateFilter: {
    fontWeight: 700,
    lineHeight: '1em',
    fontStyle: 'normal',
    height: 36,
    padding: 0
  }
}

const SaleTableHeader = props => {
  return (
    <div>
      <Input icon='search' placeholder={'Search...'} fluid={true}/>
      <Divider/>
      <div style={styles.filters}>
        <div style={styles.filterField}>
          <Field
            name={'status'}
            component={(props) => {
              const {input: {value, onChange}} = props
              return (
                <Dropdown
                  button
                  value={value}
                  className='icon'
                  floating
                  labeled
                  icon='filter'
                  options={saleStatus}
                  search
                  text='Filter Status'
                  onChange={(e, data) => onChange(data.value)}
                />
              )
            }}
          />
        </div>
        <div style={styles.filterField}>
          <Field
            name={'startDate'}
            component={(props) => {
              const {input: {value, onChange}} = props
              return (
                <DateInput
                  style={styles.dateFilter}
                  placeholder={'Range Start Date'}
                  iconPosition="left"
                  dateFormat={'MMMM DD, YYYY'}
                  value={(value) ? moment(value).format('MMMM DD, YYYY') : undefined}
                  onChange={(e, data) => onChange(data.value)}
                />
              )
            }}
          />
        </div>
        <div style={styles.filterField}>
          <Field
            name={'endDate'}
            component={(props) => {
              const {input: {value, onChange}} = props
              return (
                <DateInput
                  style={styles.dateFilter}
                  placeholder={'Range End Date'}
                  iconPosition="left"
                  dateFormat={'MMMM DD, YYYY'}
                  value={(value) ? moment(value).format('MMMM DD, YYYY') : undefined}
                  onChange={(e, data) => onChange(data.value)}
                />
              )
            }}
          />
        </div>
        <div style={styles.filterField}>
          <Checkbox toggle label={`Display Today's Sales Only`}/>
        </div>
      </div>
    </div>
  )
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
  console.log(`START DATE`, startDate)
  console.log(`END DATE`, endDate)
  let {sales} = props
  if (status !== 'none') {
    sales = sales.filter(sale => sale.status === status)
  }
  if (startDate) {
    sales = sales.filter(sale => moment(sale.date) >= moment(startDate))
  }
  if (endDate) {
    sales = sales.filter(sale => moment(sale.date) <= moment(endDate))
  }
  return (
    <div style={styles.mainContainer}>
      <SaleTableHeader {...props} />
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

export default reduxForm({
  form: 'salesFilter'
})(SaleTable)
