import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector, reset } from 'redux-form'
import SaleTable from '../components/SaleTable'
import { getSales } from '../actions/saleActions'

const selector = formValueSelector('salesFilter')

const searchOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'officialReceipt',
    'date',
    'term',
    'customer.name',
    'customer.company'
  ]
}

class SaleTableContainer extends React.Component {
  componentDidMount () {
    this.props.getSales()
  }

  render () {
    return (<SaleTable {...this.props}/>)
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

const mapDispatchToProps = dispatch => ({
  getSales: () => dispatch(getSales()),
  resetFilters: () => dispatch(reset('salesFilter'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleTableContainer)
