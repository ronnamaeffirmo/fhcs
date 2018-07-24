import { reduxForm } from 'redux-form'
import ChangePasswordForm from '../components/ChangePasswordForm'

export default reduxForm({
  form: 'password'
})(ChangePasswordForm)
