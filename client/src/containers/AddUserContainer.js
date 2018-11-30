import React from 'react'
import UserForm from '../components/UserForm'
import { addUser } from '../actions/userActions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  roles: state.role.list
})

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (values) => {
    dispatch(addUser(values))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
