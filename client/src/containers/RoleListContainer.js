import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { getAllRoles, receiveRoles } from '../actions/roleActions'
import RoleList from '../components/RoleList'

class RoleListContainer extends React.Component {
  async componentDidMount () {
    const result = await getAllRoles()
    this.props.receiveRoles(result)
  }

  render () {
    return <RoleList {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  roles: state.role.list
})

const mapDispatchToProps = (dispatch) => ({
  receiveRoles: (values) => {
    dispatch(receiveRoles(values))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleListContainer)
