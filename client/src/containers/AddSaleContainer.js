import React from 'react'
import SaleForm from '../components/SaleForm'
import {connect} from 'react-redux'

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
  }
})

export default connect(mapStateToProps, null)(AddSaleContainer)
