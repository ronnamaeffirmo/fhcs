import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import AddInventoryModalForm from '../components/AddInventoryModalForm'

const wrapped = reduxForm({
  form: 'newInventory'
})(AddInventoryModalForm)

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item
})

export default connect(mapStateToProps)(wrapped)
