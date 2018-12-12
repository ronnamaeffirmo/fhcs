import React from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import SaleTable from '../components/SaleTable'
import { getSales } from '../actions/saleActions'

const selector = formValueSelector('salesFilter')

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
    status: 'none'
  },
  filters: {
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate'),
    status: selector(state, 'status')
  }
})

const mapDispatchToProps = dispatch => ({
  getSales: () => dispatch(getSales())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleTableContainer)
