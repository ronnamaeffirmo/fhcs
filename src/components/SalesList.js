import React from 'react'
import {
  Card,
  Container,
  Input
} from 'semantic-ui-react'

import AddSalesModal from './../containers/AddSalesRecordContainer'
import SalesDataCard from './SalesDataCard'

class SalesList extends React.Component {
  
  componentDidMount () {
    this.props.getSales()
  }

  render() {
    let { sales, removeSale } = this.props
    sales = sales || []
    return (
      <Container style={styles.mainContainer}>
      <Input placeholder='Search items here...'
               style={styles.itemSearchField}/>
        <AddSalesModal/>
        <Container style={styles.itemContainer}>
          <Card.Group>
            {sales.map((sale => {
              return (
                <SalesDataCard sale={sale} actions={{removeSale}} key={sale._id}/>
              )
            }))}
          </Card.Group>
        </Container>
      </Container>
    )
  }
}

const styles = {
  mainContainer: {
    width: '768px !important',
    padding: '10px',
    marginTop: '10px',
  },
  itemSearchField: {
    width: '77%'
  },
  itemContainer: {
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '15px',
    marginRight: '15px',
    paddingTop: '7px',
    itemHeadline: {
    marginTop: '35px'
    }
  }
}

export default SalesList
