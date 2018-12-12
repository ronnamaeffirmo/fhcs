import React from 'react'
import { Form, TextArea } from 'semantic-ui-react'

const TextAreaField = ({ input, label, value, inputLabel, meta: { touched, error, warning }, ...custom }) => (
  <Form.Field error={touched && error && true}>
    <label>{label}</label>
    <TextArea label={inputLabel} value={value} {...input} {...custom} autoHeight />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </Form.Field>
)

export default TextAreaField
