import React from 'react'
import UserForm from '../components/UserForm'
import { addUser } from '../actions/userActions'
import { connect } from 'react-redux'
import { getAllRoles, receiveRoles } from '../actions/roleActions'

class AddUserContainer extends React.Component {
  async componentDidMount () {
    const roles = await getAllRoles()
    this.props.receiveRoles(roles)
  }

  render () {
    return (
      <UserForm {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  roles: state.role.list
})

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (values) => {
    dispatch(addUser(values))
  },
  receiveRoles: (values) => {
    dispatch(receiveRoles(values))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUserContainer)
