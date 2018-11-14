import AddCustomer from '../components/AddCustomer'

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addCustomer } from '../actions/customerActions'

const wrapped = reduxForm({
  form: 'customer'
})(AddCustomer)

const mapStateToProps = (state) => ({
  customers: state.customer.customers
})

const mapDispatchToProps = (dispatch) => ({
  addCustomer: (data) => dispatch(addCustomer(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapped)
