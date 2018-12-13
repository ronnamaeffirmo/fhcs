import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { createInventory } from '../actions/inventoryActions'
import { getItem } from '../actions/itemActions'

import AddInventoryModal from '../components/AddInventoryModal'

const WrappedForm = reduxForm({
  form: 'newInventory',
  enableReinitialize: true
})(AddInventoryModal)

class AddInventoryModalContainer extends Component {
  componentDidMount() {
    const { itemId } = this.props
    this.props.getItem(itemId)
  }

  render() {
    const { history, item, createInventory } = this.props
    const initialValues = item ? { itemName: item.name, item: item._id } : null
    return (
      <WrappedForm
        {...this.props}
        initialValues={initialValues}
        onSubmit={(values) => {
          createInventory(values)
          history.push('/inventories')
        }}
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  const itemId = props.match.params.id
  return {
    itemId,
    item: state.item.foundItem,
    gettingItem: state.item.gettingItem,
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  createInventory: (values) => dispatch(createInventory(values)),
  getItem: (id) => dispatch(getItem(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddInventoryModalContainer)
