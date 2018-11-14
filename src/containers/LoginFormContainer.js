import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { login, logout } from '../actions/userActions'

import LoginForm from '../components/LoginForm'

const wrapped = reduxForm({
  form: 'submitValidation'
})(LoginForm)

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (username, password) => dispatch(login(username, password)),
  handleLogout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapped)
