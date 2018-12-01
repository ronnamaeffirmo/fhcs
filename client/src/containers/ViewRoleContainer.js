import React from 'react'
import {  parseRoleDataToForm } from '../actions/roleActions'
import connect from 'react-redux/es/connect/connect'
import { getRole } from '../actions/roleActions'
import ViewRole from '../components/ViewRole'

// why is this happening? https://egghead.io/lessons/javascript-redux-fetching-data-on-route-change
// from Dan Abramov -- creator of Redux
class ViewRoleContainer extends React.Component {
  componentDidMount () {
    this.props.getRole(this.props.roleId)
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
  getRole: (id) => {
    dispatch(getRole(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewRoleContainer)
