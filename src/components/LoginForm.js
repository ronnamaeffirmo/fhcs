import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Input, Container } from 'semantic-ui-react'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <Form.Field>
    <label>{label}</label>
    <Form.Field>
      <Input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </Form.Field>
  </Form.Field>
)

const LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <Form onSubmit={handleSubmit} className="left column">
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      {error && <strong>{error}</strong>}
      <Container>
        <Button type="submit" disabled={submitting}>Log In</Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </Container>
    </Form>
  )
}

export default reduxForm({
  form: 'submitValidation' // a unique identifier for this form
})(LoginForm)
