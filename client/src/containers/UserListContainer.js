import React from 'react'
import { deleteUser, getUsers, receiveUsers } from '../actions/userActions'
import { connect } from 'react-redux'
import UserList from '../components/UserList'

class UserListContainer extends React.Component {
  async componentDidMount () {
    const users = await getUsers()
    this.props.receiveUsers(users)
  }

  render () {
    return <UserList {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  users: state.user.list
})

const mapDispatchToProps = (dispatch) => ({
  receiveUsers: (users) => {
    dispatch(receiveUsers(users))
  },
  deleteUser: (userId) => {
    dispatch(deleteUser(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer)
