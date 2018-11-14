import React from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

const SalesDropDown = ({label, value, dateFrom, onDropdownChange, input, ...custom}) => (
  <Form.Field>
    <label>{label}</label>
    {/* {console.log(dateFrom)} */}
    <Dropdown
      selection
      {...input}
      value={value}
      onChange={(param, data) =>  onDropdownChange(dateFrom,data.value)}
      {...custom}
    />
  </Form.Field>
)

export default SalesDropDown
