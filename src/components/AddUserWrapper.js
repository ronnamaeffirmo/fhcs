import React from 'react'
import AddUserForm from '../containers/AddUserFormContainer'

const AddUserWrapper = ({ createUser }) => (
  <AddUserForm onSubmit={createUser} />
)

export default AddUserWrapper
