import React from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

const DropdownField = ({label, input, ...custom}) => (
  <Form.Field>
    <label>{label}</label>
    <Dropdown
      selection
      {...input}
      value={input.value}
      onChange={(param, data) => input.onChange(data.value)}
      {...custom}
    />
  </Form.Field>
)

export default DropdownField
