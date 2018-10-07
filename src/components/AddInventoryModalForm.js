import React from 'react'
import { Button, Container, Form, Input, Modal, Select, TextArea } from 'semantic-ui-react'

const AddInventoryModalForm = ({item, options}) => (
  <Modal trigger={<Button>Add Inventory</Button>} centered={false}>
    <Modal.Header>New Inventory Record</Modal.Header>
    <Modal.Content>
      <Container>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Item Name'/>
            <Form.Field control={Input} label='Quantity' placeholder='Quantity'/>
            <Form.Field control={Select} label='Source' options={options.sources} placeholder='Source'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Select} label='Source' options={options.producers} placeholder='Producer'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='PO Number' placeholder='PO Number'/>
            <Form.Field control={Input} label='Company' placeholder='Company'/>
            <Form.Field control={Input} label='Truck Plate Number' placeholder='Truck Plate Number'/>
            <Form.Field control={Select} label='Source' options={options.statuses} placeholder='Status'/>
          </Form.Group>
          <Form.Field control={TextArea} label='Notes' placeholder='Information about this record...'/>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Container>
    </Modal.Content>
  </Modal>
)

export default AddInventoryModalForm
