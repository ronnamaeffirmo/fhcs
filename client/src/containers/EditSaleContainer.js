import React from 'react'
import SaleForm from '../components/SaleForm'
import { connect } from 'react-redux'
import { updateSale, getSale } from '../actions/saleActions'
import { getSaleContainerState } from '../common/initializers'
import { getSaleContainerDispatchers } from '../common/dispatchers'

class EditSaleContainer extends React.Component {
  componentDidMount () {
    this.props.getItemSearchList()
    this.props.getCustomerSearchList()
    this.props.getSale(this.props.saleId)
  }

  render () {
    return (
      <SaleForm {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  // initial values need to be called first so redux-form can handle the state changes
  initialValues: state.sale.selection,
  ...getSaleContainerState(state),
  saleId: ownProps.match.params.id,
})

const mapDispatchToProps = (dispatch) => {
  const commonDispatchers = getSaleContainerDispatchers(dispatch)
  return {
    ...commonDispatchers,
    submissionHandler: (values) => {
      dispatch(updateSale(values))
    },
    getSale: (id) => {
      dispatch(getSale(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSaleContainer)
