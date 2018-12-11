import React from 'react'
import { Button, Container, Form, Grid, Icon, Image } from 'semantic-ui-react'
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
    const { username, password } = this.state
    const { isAuthenticated, handleLogout } = this.props

    return (
      <Grid columns='equal' style={{ margin: 0 }}>
        <Grid.Column style={style.imageColumn} width={12}>
          <img style={style.coverImage} src='/images/fieldstone-poser.jpg' />
        </Grid.Column>
        <Grid.Column style={style.form} textAlign='center'>
          <Image centered style={style.logo} src='/images/fieldstone-logo-flat-v2.png' />
          <div style={style.header}>Login to your account</div>
          <Form className="left column">
            <Form.Input style={style.inputs} placeholder='Username' icon='mail' name='username' type='username' onChange={(e) => this.handleInput(e)}/>
            <Form.Input style={style.inputs} placeholder='Password' icon='key' name='password' type='password' onChange={(e) => this.handleInput(e)}/>
            <Button disabled={!username || !password} style={style.loginBtn} fluid color='teal' onClick={(e) => this.handleLogin(e)} content='Login'/>
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
    // object position specific to fieldstone-poser image
    objectFit: 'cover', objectPosition: '20% 13px', width: '100%', height: '100%'
  },
  form: {
    padding: '130px 48px'
  },
  logo: {
    width: '100px',
    height: 'auto'
  },
  header: {
    fontSize: '1.4rem',
    textTransform: 'uppercase',
    marginBottom: '3.8rem',
    marginTop: '2.25rem'
  },
  inputs: {
    height: '55px'
  },
  loginBtn: {
    backgroundColor: '#475462',
    marginTop: '35px',
    // lol got boxShadow from fuse
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  }
}

export default reduxForm({
  form: 'submitValidation'
})(LoginForm)
