import { reduxForm } from 'redux-form'
import AddUserForm from '../components/AddUserForm'

export default reduxForm({
  form: 'user'
})(AddUserForm)
