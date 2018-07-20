import React from 'react'
import AddItemForm from '../containers/AddItemFormContainer'

const AddItemWrapper = ({ createItem }) => (
  <AddItemForm onSubmit={createItem} />
)

export default AddItemWrapper
