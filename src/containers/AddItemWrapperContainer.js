import { connect } from 'react-redux'
import AddItemWrapper from '../components/AddItemWrapper'

import { createItem } from '../actions/itemActions'

const mapStateToProps = (state) => ({
  item: state.item.item
})

const mapDispatchToProps = (dispatch) => ({
  createItem: (values) => dispatch(createItem(values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemWrapper)
