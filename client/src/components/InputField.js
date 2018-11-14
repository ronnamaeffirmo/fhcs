import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const inputField = ({ input, value, label, inputLabel, meta: { touched, error, warning }, ...custom }) => (
  <Form.Field error={touched && error && true}>
    <label>{label}</label>
    <Input label={inputLabel} {...input } value={value} {...custom} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </Form.Field>
)

export default inputField
