import React from 'react'
import { connect } from 'react-redux'
import SalesList from '../components/SalesList'
import { getSales, removeSale } from '../actions/salesAction'

class SaleListContainer extends React.Component {
  componentDidMount () {
    this.props.getSales()
  }

  render () {
    return (
      <SalesList {...this.props} />
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
