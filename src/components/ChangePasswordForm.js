import React from 'react'
import { Field } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import InputField from './InputField'

const ChangePasswordForm = ({ handleSubmit, pristine, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      type='text'
      name='password'
      label='New password'
      placeholder='Enter new password'
      component={InputField}
    />
    <Button type='submit' disabled={pristine || submitting}>
      Submit
    </Button>
  </Form>
)

export default ChangePasswordForm
