import AddCustomerModal from '../components/AddCustomerModal'
import { connect } from 'react-redux'
import { addCustomer } from '../actions/customerActions'

const mapStateToProps = (state) => ({
  customers: state.customer.customers
})

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (data) => dispatch(addCustomer(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomerModal)
