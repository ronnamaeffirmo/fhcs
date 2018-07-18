import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const inputField = ({ input, label, inputLabel, ...custom }) => (
  <Form.Field>
    <label>{label}</label>
    <Input label={inputLabel} {...input} {...custom}/>
  </Form.Field>
)

export default inputField
