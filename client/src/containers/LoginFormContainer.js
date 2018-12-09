import React from 'react'
import { connect } from 'react-redux'
import { authorizeStorageToken, login, logout } from '../actions/userActions'

import LoginForm from '../components/LoginForm'

class LoginFormContainer extends React.Component {
  componentDidMount () {
    console.log('this has been called')
    console.log(this.props)
    this.props.handleLogin()
  }

  render () {
    return (
      <LoginForm {...this.props} />
    )
  }
}

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
)(LoginFormContainer)
