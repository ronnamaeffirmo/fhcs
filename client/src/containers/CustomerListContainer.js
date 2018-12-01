import { connect } from 'react-redux'

import CustomerList from '../components/CustomerList'
import { getCustomers, removeCustomer, filterCustomers } from '../actions/customerActions'

const mapStateToProps = (state) => ({
  customers: state.customer.customers,
  filteredCustomers: state.customer.filteredCustomers.length > 0 ? state.customer.filteredCustomers : undefined
})

const mapDispatchToProps = (dispatch) => ({
  getCustomers: () => dispatch(getCustomers()),
  removeCustomer: (id) => dispatch(removeCustomer(id)),
  filterCustomers: (searchTerm) => dispatch(filterCustomers(searchTerm))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerList)
