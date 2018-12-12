import React from 'react'
import UserForm from '../components/UserForm'
import { addUser } from '../actions/userActions'
import {getRoles} from '../actions/roleActions'
import { connect } from 'react-redux'

class AddUserContainer extends React.Component {
  componentDidMount () {
    this.props.getRoles()
  }
}

const mapStateToProps = (state) => ({
  roles: state.role.list
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
