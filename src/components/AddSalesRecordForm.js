import React from 'react'
import { Field } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import InputField from './InputField'
import DropdownField from './DropdownField'

import units from '../common/constants/units'

const AddSalesRecordForm = ({ handleSubmit, total, createSales, pristine, submitting }) => (
  <Form onSubmit= {handleSubmit(createSales)}>
    <Field 
      type='text'
      name='buyers_name'
      label='Buyers Name'
      placeholder='Buyers Name'
      component={InputField}
    />
    <Field 
      type='text'
      name='item_name'
      label='Item Name'
      placeholder='Item Name'
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
    <Field
      type='number'
      name='total'
      label='Total'
      placeholder='total'
      inputLabel='P'
      component={({ input, label, inputLabel, meta: { touched, error }, ...custom }) => (
        <Form.Field error={touched && error && true}>
          <label>{label}</label>
          <b>{inputLabel}  <u>{isNaN(total) ? 0 : total}</u></b>
        </Form.Field>
      )
      }
    />
    <Button type='submit' disabled={pristine || submitting}>
      Submit
    </Button>
  </Form>
)

export default AddSalesRecordForm
