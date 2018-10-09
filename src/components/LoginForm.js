import React from 'react'
import { Button, Container, Form } from 'semantic-ui-react'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {username: '', password: ''}
  }

  handleLogin () {
    const {username, password} = this.state
    this.props.handleLogin(username, password)
  }

  handleInput (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleLogout () {
    this.props.handleLogout()
  }

  render () {
    const {isAuthenticated} = this.props
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
            isAuthenticated ? <Button color='teal' onClick={() => this.handleLogout()} content='Logout'/>
              : <Button color='teal' onClick={() => this.handleLogin()} content='Login'/>
          }
        </Container>
      </Form>
    )
  }
}

export default LoginForm
