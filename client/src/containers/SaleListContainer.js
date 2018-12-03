import React from 'react'
import { connect } from 'react-redux'
import SaleList from '../components/SaleList'
import { applySalePayment, returnItem, getSales, removeSale } from '../actions/salesActions'

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
  sales: state.sale.list
})

const mapDispatchToProps = (dispatch) => ({
  getSales: () => dispatch(getSales()),
  removeSale: (id) => dispatch(removeSale(id)),
  applySalePayment: (values) => dispatch(applySalePayment(values)),
  returnItem: (saleId, id, returnQuantity, quantity) => dispatch(returnItem(saleId, id, returnQuantity, quantity))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleListContainer)
