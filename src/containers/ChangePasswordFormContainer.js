import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { updatePassword } from '../actions/userActions'

import ChangePasswordForm from '../components/ChangePasswordForm'

const wrapped = reduxForm({
  form: 'password'
})(ChangePasswordForm)

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (id, password) => dispatch(updatePassword(id, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapped)
