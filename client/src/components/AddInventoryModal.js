import React from 'react'
import { Field } from 'redux-form'
import { Button, Container, Form, Modal } from 'semantic-ui-react'
import InputField from './InputField'
import TextAreaField from './TextAreaField'
import DropdownField from './DropdownField'
import CustomMultiselect from './CustomMultiselect'

const AddInventoryModal = ({ workers, receivedBy, history, gettingItem, options, handleSubmit, pristine, submitting }) => (
  <Modal open size='tiny' centered={false}>
    <Modal.Header>New Inventory Record</Modal.Header>
    <Modal.Content>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Field 
              width={10} 
              type='text' 
              name='itemName' 
              label='Item Name (read only)' 
              placeholder='Item Name' 
              readOnly
              loading={gettingItem} 
              component={InputField} 
            />
            <Field 
              width={6} 
              type='number' 
              name='quantity' 
              label='Quantity' 
              placeholder='Quantity' 
              component={InputField} 
            />
          </Form.Group>
          <Field
            name='workers'
            label='Workers'
            workers={workers}
            placeholder='Workers'
            component={CustomMultiselect}
          />
          <Form.Group widths='equal'>
            <Field 
              type='selection' 
              name='source' 
              label='Source' 
              placeholder='Source' 
              options={options.sources} 
              component={DropdownField} 
            />
            <Field 
              type='selection' 
              name='producer' 
              label='Producer' 
              placeholder='Producer' 
              options={options.producers} 
              component={DropdownField} 
            />
          </Form.Group>
          <Field 
            type='text' 
            name='company' 
            label='Company' 
            placeholder='Company' 
            component={InputField} 
          />
          <Form.Group widths='equal'>
            <Field 
              type='text' 
              name='poNumber' 
              label='PO Number' 
              placeholder='PO Number' 
              component={InputField} 
            />
            <Field 
              type='text' 
              name='truckPlateNumber' 
              label='Truck Plate Number' 
              placeholder='Truck Plate Number' 
              component={InputField} 
            />
          </Form.Group>
          <Field
            name='receivedBy'
            label='Received By'
            workers={receivedBy}
            placeholder='Received By'
            component={CustomMultiselect}
          />
          <Field 
            type='selection' 
            name='status' 
            label='Status' 
            placeholder='Status' 
            options={options.statuses} 
            component={DropdownField} 
          />
          <Field 
            type='textarea' 
            name='notes' 
            label='Notes' 
            placeholder='Information about this record...' 
            component={TextAreaField} 
          />
          <Button basic onClick={() => history.push('/inventories')}>Cancel</Button>
          <Button floated='right' disabled={pristine || submitting}>Submit</Button>
        </Form>
      </Container>
    </Modal.Content>
  </Modal>
)

export default AddInventoryModal
