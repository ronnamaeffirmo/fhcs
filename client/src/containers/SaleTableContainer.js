import React from 'react'
import { connect } from 'react-redux'
import SaleTable from '../components/SaleTable'
import { getSales } from '../actions/saleActions'

class SaleTableContainer extends React.Component {
  componentDidMount () {
    this.props.getSales()
  }

  render () {
    return (<SaleTable {...this.props}/>)
  }
}

const mapStateToProps = (state) => ({
  sales: state.sale.list
})

const mapDispatchToProps = dispatch => ({
  getSales: () => dispatch(getSales())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleTableContainer)
