import React from 'react'
import { Button, Header, Icon, Modal, Popup } from 'semantic-ui-react'

// turned generic
// we should set element: { name, and _id }, removeElement action in each call of the component
const DeleteConfirmationModal = ({ element, removeElement }) => (
  <Modal
    trigger={
      <Popup
        inverted
        size='mini'
        content={`Click to delete ${element.name}`}
        position='right center'
        trigger={<Button icon='trash alternate outline' circular size='tiny' color='red' />}
      />
    }
    size='mini'>
    <Header icon='trash alternate outline' content='Delete Item'/>
    <Modal.Content>
      <p>Are you sure you want to delete?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' inverted onClick={() => removeElement(element._id)}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default DeleteConfirmationModal
