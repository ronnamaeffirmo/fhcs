import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector, reset } from 'redux-form'
import SaleTable from '../components/SaleTable'
import { getSales } from '../actions/saleActions'

const selector = formValueSelector('salesFilter')

class SaleTableContainer extends React.Component {
  componentDidMount () {
    const { customerId } = this.props
    this.props.getSales(customerId)
  }

  render () {
    return (<SaleTable {...this.props}/>)
  }
}

const mapStateToProps = (state, ownProps) => ({
  customerId: ownProps.match.params.id,
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
  getSales: (id) => dispatch(getSales(id)),
  resetFilters: () => dispatch(reset('salesFilter'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleTableContainer)
