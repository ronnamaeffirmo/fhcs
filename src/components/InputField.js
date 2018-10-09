import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const inputField = ({input, label, inputLabel, meta: {touched, error}, ...custom}) => (
  <Form.Field error={touched && error && true}>
    <label>{label}</label>
    <Input label={inputLabel} {...input} {...custom} />
  </Form.Field>
)

export default inputField
