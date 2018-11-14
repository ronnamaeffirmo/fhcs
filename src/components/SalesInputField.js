import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const SalesInputField = ({ input, otherValue, disabled, onInputChange, value, label, inputLabel, meta: { touched, error }, ...custom }) => (
  <Form.Field error={touched && error && true}>
    <label>{label}</label>
    <Input
      disabled={disabled}
      label={inputLabel}
      {...input }
      value={otherValue === undefined ? value : otherValue}
      onChange={(params, data) => onInputChange(data.value)}
      {...custom}
    />
  </Form.Field>
)

export default SalesInputField
