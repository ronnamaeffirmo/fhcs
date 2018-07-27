import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Field } from 'redux-form'
import DropdownField from './DropdownField'

// TODO: make a database collection for these roles
const roles = [
  {key: 'manager', text: 'Manager', value: 'manager'},
  {key: 'cashier', text: 'Cashier', value: 'cashier'}
]

// TODO: create database permissions and populate checkboxes

const form = ({handleSubmit}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      type='selection'
      name='role'
      label='Role'
      placeholder='Select user role'
      component={DropdownField}
      options={roles}
    />
    <Field
      type='checkbox'
      name='add-items-to-inventory'
      label='Add items to inventory'
      id='add-items-to-inventory'
      component={Checkbox}
    />
    <Button type='submit'>Submit</Button>
  </Form>
)

export default form
