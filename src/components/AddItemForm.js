import React from 'react'
import { Field } from 'redux-form'
import { Button, Form, Dropdown, Input } from 'semantic-ui-react'

// FIXME: move to constants
const units = [
  { key: 'kg', text: 'kg', value: 'kg' },
  { key: 'cubic', text: 'cubic', value: 'cubic' },
  { key: 'pcs', text: 'pcs', value: 'pcs' }
]

// FIXME: should we move these methods to somewhere?
const renderInput = ({ input, label, inputLabel, ...custom }) => (
  <Form.Field>
    <label>{label}</label>
    <Input label={inputLabel} {...input} {...custom}/>
  </Form.Field>
)

const renderDropdown = ({ label, input, ...custom }) => (
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

// TODO: refactor -- convert into an array of objects
const AddItemForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <Field
      type='text'
      name='name'
      label='Name'
      placeholder='Product name'
      component={renderInput}
    />
    <Field
      type='text'
      name='description'
      label='Description'
      placeholder='Product description'
      component={renderInput}
    />
    <Field
      type='number'
      name='price'
      label='Price'
      inputLabel='P'
      placeholder='Price of the product'
      component={renderInput}
    />
    <Field
      type='number'
      name='quantity'
      label='Quantity'
      placeholder='Quantity of the product'
      component={renderInput}
    />
    <Field
      type='selection'
      name='unit'
      label='Unit'
      placeholder='Unit of the quantity'
      component={renderDropdown}
      options={units}
    />
    <Button type='submit'>Submit</Button>
  </Form>
)

export default AddItemForm
