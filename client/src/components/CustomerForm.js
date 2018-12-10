import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import InputField from './InputField'

const required = value => value ? undefined : 'Required'

const CustomerForm = (props) => {
  const {submissionHandler, handleSubmit, pristine, submitting} = props
  return (
    <Form onSubmit={handleSubmit(submissionHandler)}>
      <Field
        type='text'
        name='name'
        label='Name'
        icon='user'
        placeholder='Name'
        component={InputField}
        validate={[required]}
      />
      <Form.Group widths='equal'>
        <Field
          type='text'
          name='phone'
          label='Phone'
          icon='phone'
          placeholder='Phone'
          component={InputField}
          validate={[required]}
        />
        <Field
          type='text'
          name='company'
          label='Company'
          icon='building outline'
          placeholder='Company'
          component={InputField}
          validate={[required]}
        />
      </Form.Group>
      <Field
        type='text'
        name='address'
        label='Address'
        icon='map marker alternate'
        placeholder='Address'
        component={InputField}
        validate={[required]}
      />
      <Button type='submit' disabled={pristine || submitting}>Submit</Button>
    </Form>
  )
}

export default reduxForm({
  form: 'customerForm'
})(CustomerForm)
