import React from 'react'
import { connect } from 'react-redux'
import { createItem } from '../actions/itemActions'

import AddItemModalForm from '../components/AddItemModalForm'

const AddItemFormContainer = ({createItem}) => (
  <AddItemModalForm onSubmit={values => createItem(values)} />
)

const mapStateToProps = (state) => ({
  item: state.item.item
})

const mapDispatchToProps = (dispatch) => ({
  createItem: (values) => {
    console.log('CREATE ITEM', values)
    dispatch(createItem(values))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemFormContainer)
