import React from 'react'
import { Button, Container, Form, Grid, Image } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import ScrollLock from 'react-scrolllock'


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
      <Grid columns='equal' style={{ margin: 0 }}>
        <Grid.Column style={style.imageColumn} width={12}>
          <img style={style.coverImage} src='/images/fieldstone.jpg' />
        </Grid.Column>
        <Grid.Column style={style.form}>
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
        </Grid.Column>
        <ScrollLock />
      </Grid>
    )
  }
}

const style = {
  imageColumn: {
    height: '100vh', padding: 0
  },
  coverImage: {
    objectFit: 'cover', width: '100%', height: '100%'
  },
  form: {
    padding: '120px 48px'
  }
}

export default reduxForm({
  form: 'submitValidation'
})(LoginForm)
