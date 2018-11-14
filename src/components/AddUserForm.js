import React from 'react'
import { Field } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'

const AddUserForm = ({ handleSubmit, pristine, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Username</label>
      <Field
        name='username'
        type='text'
        placeholder='Username'
        component='input'
      />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <Field
        name='password'
        type='password'
        placeholder='Password'
        component='input'
      />
    </Form.Field>
    <Form.Field>
      <label>First Name</label>
      <Field
        name='firstname'
        type='text'
        placeholder='First Name'
        component='input'
      />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <Field
        name='lastname'
        type='text'
        placeholder='Last Name'
        component='input'
      />
    </Form.Field>
    <Form.Field>
      <label>Address</label>
      <Field
        name='address'
        type='text'
        placeholder='Address'
        component='input'
      />
    </Form.Field>
    <Button type='submit' disabled={pristine || submitting}>
      Submit
    </Button>
  </Form>
)

export default AddUserForm
