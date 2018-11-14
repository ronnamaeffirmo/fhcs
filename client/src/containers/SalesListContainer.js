import { connect } from 'react-redux'

import SalesList from '../components/SalesList'
import { getSales, removeSale } from '../actions/salesAction'

const mapStateToProps = (state) => ({
  sales: state.sales.sales
})

const mapDispatchToProps = (dispatch) => ({
  getSales: () => dispatch(getSales()),
  removeSale: (id) => dispatch(removeSale(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesList)
