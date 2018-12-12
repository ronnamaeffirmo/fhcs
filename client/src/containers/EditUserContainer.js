import React from 'react'
import UserForm from '../components/UserForm'
import { editUser, getUser } from '../actions/userActions'
import { connect } from 'react-redux'
import { getRoles } from '../actions/roleActions'

class EditUserContainer extends React.Component {
  async componentWillMount () {
    this.props.getRoles()
    this.props.getUser(this.props.userId)
  }

  render () {
    if (this.props.initialValues) {
      console.log('RENDERED', this.props.initialValues._id)
    }
    return (
      <UserForm {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  userId: ownProps.match.params.id,
  roles: state.role.list,
  addingUser: state.user.addingUser,
  initialValues: state.user.selection
})

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (values) => {
    dispatch(editUser(values))
  },
  getUser: (id) => {
    dispatch(getUser(id))
  },
  getRoles: () => {
    dispatch(getRoles())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserContainer)
