import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Modal } from 'semantic-ui-react'
import InputField from './InputField'
import TextAreaField from './TextAreaField'
import DropdownField from './DropdownField'
import units from '../common/constants/units'

class AddItemModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.openClose = this.openClose.bind(this)
  }

  openClose () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <Modal
        size='tiny'
        open={this.state.open}
        onClose={this.openClose}
        trigger={<Button style={styles.searchButton} onClick={this.openClose}>NEW ITEM</Button>} centered={false}>
        <Modal.Header>Add A New Item</Modal.Header>
        <Modal.Content>
          <Form onSubmit={() => {
            this.openClose()
            handleSubmit()
          }}>
            <Field
              type='text'
              name='name'
              label='Name'
              placeholder='Product name'
              component={InputField}
            />
            <Field
              type='textarea'
              name='description'
              label='Description'
              placeholder='Product description'
              component={TextAreaField}
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
            <Button basic onClick={this.openClose}>Cancel</Button>
            <Button floated='right' type='submit' disabled={pristine || submitting}>
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const styles = {
  searchButton: {
    width: '21%',
    float: 'right',
    backgroundColor: 'green',
    color: 'white'
  }
}

export default reduxForm({form: 'item'})(AddItemModal)
