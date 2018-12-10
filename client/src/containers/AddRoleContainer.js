import RoleForm from '../components/RoleForm'
import { addNewRole } from '../actions/roleActions'
import connect from 'react-redux/es/connect/connect'

const mapDispatchToProps = (dispatch) => ({
  submissionHandler: (values) => {
    dispatch(addNewRole(values))
  }
})

export default connect(null, mapDispatchToProps)(RoleForm)
