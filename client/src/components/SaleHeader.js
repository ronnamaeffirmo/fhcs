import React from 'react'
import { Button, Divider, Dropdown, Input, Grid, Icon, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import saleStatus from '../common/constants/saleStatus'
import { DateInput } from 'semantic-ui-calendar-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const styles = {
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
  },
  searchField: {
    width: '80%'
  },
  headerButton: {
    backgroundColor: 'green',
    color: 'white',
    height: 38
  }
}

const SaleHeader = props => {
  const {resetFilters, filterSales} = props
  return (
    <Segment>
      <div style={styles.filters}>
        <Grid verticalAlign={'middle'} divided>
          <Grid.Row colums={2}>
            <Grid.Column width={12}>
              <Input icon='search' fluid placeholder={'Search...'} onChange={(e) => { filterSales(e.target.value) }}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button fluid as={Link} to={'/sales/new'} style={styles.headerButton}>NEW SALE</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <Divider/>
      <div style={styles.filters}>
        <div style={styles.filterField}>
          <Button icon circular onClick={(e) => {
            e.preventDefault()
            resetFilters()
          }}>
            <Icon name='redo' />
          </Button>
        </div>
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
      </div>
    </Segment>
  )
}

export default reduxForm({
  form: 'salesFilter'
})(SaleHeader)
