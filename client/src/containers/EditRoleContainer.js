import React from 'react'
import EditRole from '../components/EditRole'
import { updateRole, parseRoleDataToForm } from '../actions/roleActions'
import connect from 'react-redux/es/connect/connect'
import { fetchRole, receiveRole } from '../actions/roleActions'

// why is this happening? https://egghead.io/lessons/javascript-redux-fetching-data-on-route-change
// from Dan Abramov -- creator of Redux
class EditRoleContainer extends React.Component {
  async componentDidMount () {
    const role = await fetchRole(this.props.match.params.id)
    this.props.receiveRole(role)
  }

  render () {
    return <EditRole {...this.props}/>
  }
}

const mapStateToProps = (state) => ({
  initialValues: parseRoleDataToForm(state.role.updateSelection),
  updateSelection: state.role.updateSelection
})

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (values) => {
    dispatch(updateRole(values))
  },
  receiveRole: (values) => {
    dispatch(receiveRole(values))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleContainer)
