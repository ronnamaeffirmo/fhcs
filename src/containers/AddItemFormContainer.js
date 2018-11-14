import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { createItem } from '../actions/itemActions'

import AddItemModalForm from '../components/AddItemModalForm'

const wrapped = reduxForm({
  form: 'item'
})(AddItemModalForm)

const mapStateToProps = (state) => ({
  item: state.item.item
})

const mapDispatchToProps = (dispatch) => ({
  createItem: (values) => dispatch(createItem(values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapped)
