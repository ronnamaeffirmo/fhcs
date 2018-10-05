import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const inputField = ({ input, value, label, inputLabel, meta: { touched, error }, ...custom }) => (
  <Form.Field error={touched && error && true}>
    {/* {console.log(dateTo)} */}
    <label>{label}</label>
    <Input label={inputLabel} {...input } value={value} {...custom} />
  </Form.Field>
)

export default inputField
