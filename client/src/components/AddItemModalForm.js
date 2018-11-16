import React from 'react'
import { Field } from 'redux-form'
import { Button, Form, Modal } from 'semantic-ui-react'
import InputField from './InputField'
import DropdownField from './DropdownField'

import units from '../common/constants/units'

// TODO: refactor -- convert into an array of objects

const AddItemModalForm = ({createItem, handleSubmit, pristine, submitting}) => (
  <Modal trigger={<Button style={styles.searchButton}>NEW ITEM</Button>} centered={false}>
    <Modal.Header>Add A New Item</Modal.Header>
    <Modal.Content>
      <Form onSubmit={handleSubmit(createItem)}>
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
    </Modal.Content>
  </Modal>
)

const styles = {
  searchButton: {
    width: '21%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

export default AddItemModalForm
