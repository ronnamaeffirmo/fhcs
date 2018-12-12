import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { updateInventory, getInventoryById } from '../actions/inventoriesAction'
import AddInventoryModal from '../components/AddInventoryModal'

const WrappedForm = reduxForm({
  form: 'newInventory',
  enableReinitialize: true
})(AddInventoryModal)

class AddInventoryModalContainer extends Component {
	componentDidMount() {
		const { inventoryId } = this.props
		this.props.getInventoryById(inventoryId)
	}

	render() {
		return (
			<WrappedForm 
				{...this.props} 
				initialValues={this.props.inventory}
				onSubmit={(values) => {
          this.props.updateInventory(values)
          this.props.history.push('/inventories')
        }} 
			/>
		)
	}
}

const mapStateToProps = (state, props) => {
	const inventoryId = props.match.params.id
	return {
		inventoryId,
		inventory: state.inventory.inventory,
		gettingInventory: state.inventory.gettingInventory,
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
  updateInventory: (values) => dispatch(updateInventory(values)),
  getInventoryById: (id) => dispatch(getInventoryById(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddInventoryModalContainer)
