import React from 'react'
import { Field } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import InputField from './InputField'
import DropdownField from './DropdownField'

// FIXME: move to constants
const units = [
  {key: 'kg', text: 'kg', value: 'kg'},
  {key: 'cubic', text: 'cubic', value: 'cubic'},
  {key: 'pcs', text: 'pcs', value: 'pcs'}
]

// TODO: refactor -- convert into an array of objects

const AddItemForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <Field
      type='text'
      name='name'
      label='Name'
      placeholder='Product name'
      component={InputField}
    />
    <Field
      type='text'
      name='description'
      label='Description'
      placeholder='Product description'
      component={InputField}
    />
    <Field
      type='number'
      name='price'
      label='Price'
      inputLabel='P'
      placeholder='Price of the product'
      component={InputField}
    />
    <Field
      type='number'
      name='quantity'
      label='Quantity'
      placeholder='Quantity of the product'
      component={InputField}
    />
    <Field
      type='selection'
      name='unit'
      label='Unit'
      placeholder='Unit of the quantity'
      component={DropdownField}
      options={units}
    />
    <Button type='submit'>Submit</Button>
  </Form>
)

export default AddItemForm
