import { reduxForm } from 'redux-form'
import EditRoleForm from '../components/EditRoleForm'

export default reduxForm({
  form: 'role'
})(EditRoleForm)
