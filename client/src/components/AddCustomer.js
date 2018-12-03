import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { Field } from 'redux-form'

import InputField from './InputField'

const required = value => value ? undefined : 'Required'

const AddCustomerForm = ({addCustomer, handleSubmit, pristine, submitting}) => (
  <Modal size="tiny" trigger={<Button style={styles.searchButton}>NEW CUSTOMER</Button>}
    centered={false}>
    <Modal.Header>Add a New Customer</Modal.Header>
    <Modal.Content>
      <Form onSubmit={handleSubmit(addCustomer)}>
        {/*
          name: { type: 'String', required: true },
          address: { type: 'String', required: true },
          phone: { type: 'String', required: true },
          company: { type: 'String' }
        */}
        <Field
          type='text'
          name='name'
          label='Name'
          icon='user'
          placeholder='Name'
          component={InputField}
          validate={[required]}
        />
        <Form.Group widths='equal'>
          <Field
            type='text'
            name='phone'
            label='Phone'
            icon='phone'
            placeholder='Phone'
            component={InputField}
            validate={[required]}
          />
          <Field
            type='text'
            name='company'
            label='Company'
            icon='building outline'
            placeholder='Company'
            component={InputField}
            validate={[required]}
          />
        </Form.Group>
        <Field
          type='text'
          name='address'
          label='Address'
          icon='map marker alternate'
          placeholder='Address'
          component={InputField}
          validate={[required]}
        />
        <Button type='submit' disabled={pristine || submitting}>Submit</Button>
      </Form>
    </Modal.Content>
  </Modal>
)

const styles = {
  searchButton: {
    width: '24%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

export default AddCustomerForm
