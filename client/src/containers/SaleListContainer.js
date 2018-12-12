import React from 'react'
import { connect } from 'react-redux'
import SaleList from '../components/SaleList'
import { applySalePayment, returnItem, getSales, removeSale } from '../actions/saleActions'
import { formValueSelector, reset } from 'redux-form'

const selector = formValueSelector('salesFilter')

class SaleListContainer extends React.Component {
  componentDidMount () {
    this.props.getSales()
  }

  render () {
    return (
      <SaleList {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  sales: state.sale.list,
  initialValues: {
    status: 'none',
    searchTerm: ''
  },
  filters: {
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate'),
    status: selector(state, 'status')
  }
})

const mapDispatchToProps = (dispatch) => ({
  getSales: () => dispatch(getSales()),
  removeSale: (id) => dispatch(removeSale(id)),
  applySalePayment: (values) => dispatch(applySalePayment(values)),
  returnItem: (data) => dispatch(returnItem(data)),
  resetFilters: () => dispatch(reset('salesFilter'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleListContainer)
