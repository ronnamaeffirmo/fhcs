import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const inputField = ({ width, input, value, yudipota, label, inputLabel, meta: { touched, error, warning }, ...custom }) => (
  <Form.Field width={width} error={touched && error && true}>
    <label>{label}</label>
    <Input label={inputLabel} {...input } {...custom} value={yudipota} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </Form.Field>
)

export default inputField
