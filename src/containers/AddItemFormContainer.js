import { reduxForm } from 'redux-form'
import AddItemForm from '../components/AddItemForm'

export default reduxForm({
  form: 'item'
})(AddItemForm)
