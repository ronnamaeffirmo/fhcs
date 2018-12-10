import React from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '', password: ''
    }
  }

  async handleLogin (e) {
    e.preventDefault()

    const { username, password } = this.state
    const { handleLogin, history } = this.props
    const { pathname } = history.location.state.from

    await handleLogin(username, password)
    history.push(pathname)
  }

  handleInput (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { isAuthenticated, handleLogout } = this.props
    return (
      <Form className="left column">
        <Form.Field>
          <label>Username</label>
          <Form.Input placeholder='username' name='username' type='username' onChange={(e) => this.handleInput(e)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Form.Input placeholder='password' name='password' type='password' onChange={(e) => this.handleInput(e)}/>
        </Form.Field>
        <Container>
          {
            /**
             * show that login and logout is working
             * sa ibang page dapat ang logout. Like sa Header of something home page :)
             */
            isAuthenticated ? <Button color='teal' onClick={handleLogout} content='Logout'/>
              : <Button color='teal' onClick={(e) => this.handleLogin(e)} content='Login'/>
          }
        </Container>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'submitValidation'
})(LoginForm)
