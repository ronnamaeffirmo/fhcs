import React, { Fragment } from 'react'
import { Container, Segment, Message, Loader } from 'semantic-ui-react'
import SalesDataCard from './SaleDataCard'
import SaleHeader from './SaleHeader'
import moment from 'moment'

const SaleList = (props) => {
  let {sales, removeSale, applySalePayment, returnItem, loading} = props
  sales = sales || []
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
      <Segment style={styles.topSegment}>
        <SaleHeader {...props}/>
      </Segment>
      <div style={styles.bottomSegment}>
        {loading 
          ? <Segment vertical padded>
              <Loader active />
            </Segment>
          : <Fragment>
            {sales && !sales.length && <Message negative>No available sales yet</Message>}
            {sales.map(sale => (
              <SalesDataCard sale={sale} actions={{removeSale, applySalePayment, returnItem}} key={sale._id}/>
            ))}
          </Fragment>
        }
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
