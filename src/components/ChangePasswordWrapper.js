import React from 'react'
import ChangePasswordForm from '../containers/ChangePasswordFormContainer'

const ChangePasswordWrapper = ({ updatePassword }) => (
  <ChangePasswordForm onSubmit={updatePassword} />
)

export default ChangePasswordWrapper
