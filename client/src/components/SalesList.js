import React from 'react'
import { Card, Container, Input, Segment, Message } from 'semantic-ui-react'
import SalesDataCard from './SalesDataCard'

class SalesList extends React.Component {
  componentDidMount () {
    this.props.getSales()
  }

  render () {
    let { sales, removeSale } = this.props
    sales = sales || []
    return (
      <Container style={styles.mainContainer}>
        <Segment style={styles.topSegment}>
          <Input
            placeholder='Search items here...'
            style={styles.itemSearchField}
          />
        </Segment>
        <Segment style={styles.bottomSegment}>
          { !sales.length && <Message negative>No available sales yet</Message>}
          <Card.Group>
            { sales.map(sale => (
              <SalesDataCard sale={sale} actions={{removeSale}} key={sale._id}/>
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
  topSegment: {
    boxShadow: 'none'
  },
  itemSearchField: {
    width: '77%'
  },
  bottomSegment: {
    paddingBottom: '3rem'
  }
}

export default SalesList
