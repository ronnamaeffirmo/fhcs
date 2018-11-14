import React from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

const SalesSimpleDropDown = ({label, value, onDropdownChange, input, ...custom}) => (
  <Form.Field>
    <label>{label}</label>
    <Dropdown
      selection
      {...input}
      value={value}
      onChange={(param, data) =>  onDropdownChange(data.value)}
      {...custom}
    />
  </Form.Field>
)

export default SalesSimpleDropDown
