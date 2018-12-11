import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../actions/userActions'
import { BarLoader as Loader } from 'react-spinners'
import LoginForm from '../components/LoginForm'

class LoginFormContainer extends React.Component {
  componentDidMount () {
    this.props.handleLogin()
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, history } = nextProps
    if (isAuthenticated) {
      const { state } = history.location

      if (state && state.from) {
        // redirect to previous route
        const { pathname } = state.from
        history.push(pathname)
      } else {
        history.push('/')
      }
    }
  }

  render () {
    const { authLoading } = this.props
    return (
      <Fragment>
        { authLoading ? (
          <div style={style.loaderParent}>
            <Loader loading={authLoading} />
          </div>
        ) : (
          <LoginForm {...this.props} />
        )}
      </Fragment>
    )
  }
}

const style = {
  loaderParent: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.currentUser,
  authLoading: state.user.authLoading
})

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (username, password) => dispatch(login(username, password)),
  handleLogout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer)
