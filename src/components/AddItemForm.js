import React from 'react'
import { Field } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import InputField from './InputField'
import DropdownField from './DropdownField'

import units from '../common/constants/units'

// TODO: refactor -- convert into an array of objects

const AddItemForm = ({ handleSubmit, pristine, submitting }) => (
  <Form onSubmit={handleSubmit}>
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
    <Button type='submit' disabled={pristine || submitting}>
      Submit
    </Button>
  </Form>
)

export default AddItemForm
