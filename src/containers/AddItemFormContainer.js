import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { createItem } from '../actions/itemActions'

import AddItemForm from '../components/AddItemForm'

const wrapped = reduxForm({
  form: 'item'
})(AddItemForm)

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
