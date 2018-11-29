import React from 'react'
import {  parseRoleDataToForm } from '../actions/roleActions'
import connect from 'react-redux/es/connect/connect'
import { fetchRole, receiveRole } from '../actions/roleActions'
import ViewRole from '../components/ViewRole'

// why is this happening? https://egghead.io/lessons/javascript-redux-fetching-data-on-route-change
// from Dan Abramov -- creator of Redux
class ViewRoleContainer extends React.Component {
  async componentDidMount () {
      const role = await fetchRole(this.props.roleId)
      this.props.receiveRole(role)
  }

  render () {
    return <ViewRole {...this.props}/>
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    initialValues: parseRoleDataToForm(state.role.selection),
    roleId: ownProps.match.params.id,
    selection: state.role.selection
  }
}

const mapDispatchToProps = (dispatch) => ({
  receiveRole: (values) => {
    dispatch(receiveRole(values))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoleContainer)
