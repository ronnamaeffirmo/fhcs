import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import CustomerForm from './CustomerForm'

const AddCustomerModal = ({triggerComponent: TriggerComponent, submissionHandler}) => {
  TriggerComponent = TriggerComponent ? TriggerComponent : <Button style={styles.searchButton}>NEW CUSTOMER</Button>
  return (
    <Modal size="tiny" trigger={TriggerComponent} centered={false} onOpen={(e) => {e.preventDefault()}}>
      <Modal.Header>NEW CUSTOMER</Modal.Header>
      <Modal.Content>
        <CustomerForm submissionHandler={submissionHandler} />
      </Modal.Content>
    </Modal>
  )
}

const styles = {
  searchButton: {
    width: '24%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

export default AddCustomerModal
