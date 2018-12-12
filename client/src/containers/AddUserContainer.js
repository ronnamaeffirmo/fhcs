import React from 'react'
import { addUser } from '../actions/userActions'
import { getRoles } from '../actions/roleActions'
import { connect } from 'react-redux'
import UserForm from '../components/UserForm'

class AddUserContainer extends React.Component {
  componentDidMount () {
    this.props.getRoles()
  }

  render() {
    return (
      <UserForm {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  roles: state.role.list,
  addingUser: state.user.addingUser
})

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (values) => {
    dispatch(addUser(values))
  },
  getRoles: () => {
    dispatch(getRoles())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUserContainer)
