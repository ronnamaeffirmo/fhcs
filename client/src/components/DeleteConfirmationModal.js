import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

// turned generic
// we should set element: { name, and _id }, removeElement action in each call of the component
const DeleteConfirmationModal = ({ element, removeElement }) => (
  <Modal
    trigger={<Button icon='trash alternate outline' labelPosition='left' content='Delete' size='tiny' color='red' />}
    size='mini'>
    <Header icon='trash alternate outline' content='Delete Item'/>
    <Modal.Content>
      <p>Are you sure you want to delete {element.name}?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' inverted onClick={() => removeElement(element._id)}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default DeleteConfirmationModal
