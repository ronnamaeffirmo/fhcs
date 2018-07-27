import React from 'react'
import LoginForm from '../components/LoginForm'

class LoginFormContainer extends React.Component {
  render () {
    return <LoginForm onSubmit={(values) => console.log('VALUE:', values)} />
  }
}

export default LoginFormContainer
