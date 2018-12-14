import React from 'react'
import SaleForm from '../components/SaleForm'
import { connect } from 'react-redux'
import { addSale } from '../actions/saleActions'
import { getSaleContainerState } from '../common/initializers'
import { getSaleContainerDispatchers } from '../common/dispatchers'

class AddSaleContainer extends React.Component {
  componentDidMount () {
    this.props.getItemSearchList()
    this.props.getCustomerSearchList()
  }

  render () {
    return (
      <SaleForm {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.sale.loading,
  ...getSaleContainerState(state)
})

const mapDispatchToProps = (dispatch) => {
  const commonDispatchers = getSaleContainerDispatchers(dispatch)
  return {
    ...commonDispatchers,
    submissionHandler: (values) => {
      dispatch(addSale(values))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSaleContainer)
