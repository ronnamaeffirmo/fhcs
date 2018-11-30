import React from 'react'
import SaleForm from '../components/SaleForm'
import { connect } from 'react-redux'

import { formValueSelector } from 'redux-form'

const selector = formValueSelector('saleForm')

class AddSaleContainer extends React.Component {
  render () {
    return (
      <SaleForm {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  tmp: {
    item: selector(state, 'tmpItem'),
    price: selector(state, 'tmpPrice'),
    quantity: selector(state, 'tmpQuantity'),
    discount: selector(state, 'tmpDiscount')
  },
  items: itemStateInitializer(selector(state, 'items'))
})

const itemStateInitializer = (items) => {
  let initialItemsState = [{}]
  if (items) {
    initialItemsState = items.map(item => {
      return {
        ...item,
        price: parseFloat(item.price).toFixed(2),
        discount: parseFloat(item.discount).toFixed(2),
        subtotal: (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2),
        total: ((parseFloat(item.price) * parseFloat(item.quantity)) - parseFloat(item.discount)).toFixed(2)
      }
    })
    return initialItemsState
  }
}

export default connect(mapStateToProps, null)(AddSaleContainer)
