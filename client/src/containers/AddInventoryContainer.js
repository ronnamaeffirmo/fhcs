import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { createInventory, toggleModal } from '../actions/inventoriesAction'

import AddInventoryModalForm from '../components/AddInventoryModalForm'

const WrappedForm = reduxForm({
  form: 'newInventory'
})(AddInventoryModalForm)

const FormHandler = ({ createInventory, item, options }) => (
  <WrappedForm item={item} options={options} onSubmit={(values) => createInventory(values)} />
)

const mapStateToProps = (state, ownProps) => ({
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
