import React from 'react'
import { connect } from 'react-redux'
import SaleList from '../components/SaleList'
import { applySalePayment, returnItem, getSales, removeSale } from '../actions/saleActions'
import { formValueSelector, reset } from 'redux-form'
import { filterSales } from '../actions/saleActions'

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
  loading: state.sale.loading,
  sales: state.sale.list,
  initialValues: {
    status: 'none',
    searchTerm: ''
  },
  filters: {
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate'),
    status: selector(state, 'status')
  },
  filteredSales: state.sale.filteredList.length > 0 ? state.sale.filteredList : undefined
})

const mapDispatchToProps = (dispatch) => ({
  getSales: () => dispatch(getSales()),
  removeSale: (id) => dispatch(removeSale(id)),
  applySalePayment: (values) => dispatch(applySalePayment(values)),
  returnItem: (data) => dispatch(returnItem(data)),
  resetFilters: () => dispatch(reset('salesFilter')),
  filterSales: (searchTerm) => dispatch(filterSales(searchTerm))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleListContainer)
