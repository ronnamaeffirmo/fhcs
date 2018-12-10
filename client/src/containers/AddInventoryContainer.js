import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { createInventory, toggleModal } from '../actions/inventoriesAction'

import AddInventoryModal from '../components/AddInventoryModal'

const WrappedForm = reduxForm({
  form: 'newInventory',
  enableReinitialize: true
})(AddInventoryModal)

const FormHandler = (props) => (
  <WrappedForm {...props} onSubmit={(values) => props.createInventory(values)}>
    {console.log('props', props)}
  </WrappedForm>
)

const mapStateToProps = (state, ownProps) => ({
  initialValues: { itemName: ownProps.item.name },
  item: ownProps.item,
  options: {
    sources: [
      {key: 'delivery', value: 'delivery', text: 'Delivery'},
      {key: 'production', value: 'production', text: 'Production'}
    ],
    producers: [
      {key: 'hbm1', value: 'hbm1', text: 'Hollow Block Machine 1'},
      {key: 'hbm2', value: 'hbm2', text: 'Hollow Block Machine 2'}
    ],
    statuses: [
      {key: 'received', value: 'received', text: 'Received'},
      {key: 'inTransit', value: 'in_transit', text: 'In Transit'},
      {key: 'returned', value: 'returned', text: 'Returned'}
    ]
  }
})

const mapDispatchToProps = (dispatch) => ({
  createInventory: (values) => dispatch(createInventory(values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormHandler)
