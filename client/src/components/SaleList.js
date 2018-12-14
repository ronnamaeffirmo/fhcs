import React from 'react'
import { Container, Divider, Message } from 'semantic-ui-react'
import SalesDataCard from './SaleDataCard'
import SaleHeader from './SaleHeader'
import moment from 'moment'

const SaleList = (props) => {
  let {sales, filteredSales, removeSale, applySalePayment, returnItem} = props
  sales = filteredSales || sales || []
  const {filters: {startDate, endDate, status}} = props
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
    <Container style={styles.mainContainer}>
      <SaleHeader {...props}/>
      <Divider/>
      <div style={styles.bottomSegment}>
        {!sales.length && <Message negative>No available sales yet</Message>}
        {sales.map(sale => (
          <SalesDataCard sale={sale} actions={{removeSale, applySalePayment, returnItem}} key={sale._id}/>
        ))}
      </div>
    </Container>
  )
}

const styles = {
  mainContainer: {
    width: '768px !important',
    padding: '10px',
    marginTop: '10px'
  },
  topSegment: {
    boxShadow: 'none'
  },
  itemSearchField: {
    width: '77%'
  },
  bottomSegment: {
    paddingBottom: '3rem',
    width: '768px !important'
  }
}

export default SaleList
