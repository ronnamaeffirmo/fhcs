import React from 'react'
import { Field } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import InputField from './InputField'

const ChangePasswordForm = ({updatePassword, handleSubmit, pristine, submitting}) => (
  <Form onSubmit={handleSubmit(updatePassword)}>
    <Field
      type='password'
      name='oldpassword'
      label='Old password'
      placeholder='Enter your old password'
      component={InputField}
    />
    <Field
      type='password'
      name='newpassword'
      label='New password'
      placeholder='Enter new password'
      component={InputField}
    />
    <Field
      type='password'
      name='confirmpassword'
      label='Confirm new password'
      placeholder='Enter new password again'
      component={InputField}
    />
    <Button type='submit' disabled={pristine || submitting}>
      Submit
    </Button>
  </Form>
)

export default ChangePasswordForm
