import React, { Component } from 'react'
import { Card, Container, Input, Segment, Message } from 'semantic-ui-react'
import AddCustomerModal from '../containers/AddCustomerContainer'
import CustomerDataCard from './CustomerDataCard'

class CustomerList extends Component {
  componentDidMount () {
    this.props.getCustomers()
  }

  render () {
    let { customers, removeCustomer, filterCustomers, filteredCustomers } = this.props
    customers = filteredCustomers || customers || []
    return (
      <Container style={styles.mainContainer}>
        <Segment style={styles.topSegment}>
          <Input
            placeholder='Search for customers here...'
            style={styles.customerSearchField}
            onChange={(e) => { filterCustomers(e.target.value) }}
          />
          <AddCustomerModal />
        </Segment>
        <Segment style={styles.bottomSegment}>
          { !customers.length && <Message negative>No available customers yet</Message>}
          <Card.Group>
            { customers.map((customer) => (
              <CustomerDataCard customer={customer} key={customer._id} actions={{removeCustomer}} />
            ))}
          </Card.Group>
        </Segment>
      </Container>
    )
  }
}

const styles = {
  mainContainer: {
    width: '768px !important',
    padding: '10px',
    marginTop: '10px'
  },
  customerSearchField: {
    width: '74%'
  },
  topSegment: {
    boxShadow: 'none'
  },
  bottomSegment: {
    paddingBottom: '3rem'
  }
}

export default CustomerList
