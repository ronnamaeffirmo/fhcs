import React from 'react'
import { deleteUser, getUsers} from '../actions/userActions'
import { connect } from 'react-redux'
import UserList from '../components/UserList'

class UserListContainer extends React.Component {
  async componentDidMount () {
    this.props.getUsers()
  }

  render () {
    return <UserList {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  users: state.user.list
})

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => {
    dispatch(getUsers())
  },
  deleteUser: (userId) => {
    dispatch(deleteUser(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer)
