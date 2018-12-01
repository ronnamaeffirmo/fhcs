import React from 'react'
import { connect } from 'react-redux'
import SaleList from '../components/SaleList'
import { getSales, removeSale } from '../actions/salesAction'

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
  removeSale: (id) => dispatch(removeSale(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleListContainer)
