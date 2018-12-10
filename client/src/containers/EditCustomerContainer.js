import CustomerForm from '../components/CustomerForm'

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addCustomer } from '../actions/customerActions'

const wrapped = reduxForm({
  form: 'customerForm'
})(CustomerForm)

const mapStateToProps = (state, ownProps) => ({
  initialValues: state.customer.customers.filter(customer => customer._id === ownProps.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (data) => dispatch(addCustomer(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapped)
