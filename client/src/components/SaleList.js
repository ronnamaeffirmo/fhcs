import React from 'react'
import { Card, Container, Input, Segment, Message, Button } from 'semantic-ui-react'
import SalesDataCard from './SaleDataCard'
import { Link } from 'react-router-dom'

const SaleList = (props) => {
  let {sales, removeSale} = props
  sales = sales || []
  return (
    <Container style={styles.mainContainer}>
      <Segment style={styles.topSegment}>
        <Input
          placeholder='Search sales here...'
          style={styles.itemSearchField}
        />
        <Button as={Link} to={'/sales/new'} style={styles.headerButton}>NEW SALE</Button>
      </Segment>
      <Segment style={styles.bottomSegment}>
        {!sales.length && <Message negative>No available sales yet</Message>}
        <Card.Group>
          {sales.map(sale => (
            <SalesDataCard sale={sale} actions={{removeSale}} key={sale._id}/>
          ))}
        </Card.Group>
      </Segment>
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
    paddingBottom: '3rem'
  },
  headerButton: {
    width: '22%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

export default SaleList
