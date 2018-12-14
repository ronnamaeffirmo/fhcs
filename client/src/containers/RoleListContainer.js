import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { getRoles, removeRole } from '../actions/roleActions'
import RoleList from '../components/RoleList'

class RoleListContainer extends React.Component {
  componentDidMount () {
    this.props.getRoles()
  }

  render () {
    return <RoleList {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  loading: state.role.loading,
  roles: state.role.list
})

const mapDispatchToProps = (dispatch) => ({
  removeRole: (id) => {dispatch(removeRole(id))},
  getRoles: () => {dispatch(getRoles())}
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleListContainer)
