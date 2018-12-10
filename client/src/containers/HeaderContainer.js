import { connect } from 'react-redux'
import { login, logout } from '../actions/userActions'

import Header from '../components/Header'

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
)(Header)
