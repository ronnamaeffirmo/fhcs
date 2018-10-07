import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DeleteConfirmationModal = ({item, removeItem}) => (
  <Modal trigger={<Button color='red' style={styles.actionButton}><Icon name='delete'/>Delete</Button>} size='mini'>
    <Header icon='delete' content='Delete Item'/>
    <Modal.Content>
      <p>
        Are you sure you want to delete {item.name}?
      </p>
    </Modal.Content>
    <Modal.Actions>

      <Button color='red' inverted onClick={() => removeItem(item._id)}>
        <Icon name='checkmark'/> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

const styles = {
  actionButton: {
    color: '#fff',
    borderRadius: '0.25em',
    marginRight: '7px',
    padding: '0.767em',
    border: 'none',
    textShadow: '0 1px 1px rgba(0,0,0,.1)'
  }
}

export default DeleteConfirmationModal
