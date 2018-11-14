import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { Field } from 'redux-form'

import InputField from './InputField'

const required = value => value ? undefined : 'Required'

const AddCustomerForm = ({addCustomer, handleSubmit, pristine, submitting}) => (
  <Modal trigger={<Button>NEW CUSTOMER</Button>}
    centered={false}>
    <Modal.Header>Add A New Customer</Modal.Header>
    <Modal.Content>
      <Form onSubmit={handleSubmit(addCustomer)}>
        <Field
          type='text'
          name='firstname'
          label='First Name'
          placeholder='First name'
          component={InputField}
          validate={[required]}
        />
        <Field
          type='text'
          name='lastname'
          label='Last Name'
          placeholder='Last name'
          component={InputField}
          validate={[required]}
        />
        <Field
          type='text'
          name='address'
          label='Address'
          placeholder='Address'
          component={InputField}
          validate={[required]}
        />
        <Button type='submit' disabled={pristine || submitting}>Submit</Button>
      </Form>
    </Modal.Content>
  </Modal>
)

export default AddCustomerForm
