import { connect } from 'react-redux'

import ItemList from '../components/ItemList'
import { getItems, removeItem } from '../actions/itemActions'

const mapStateToProps = (state) => ({
  items: state.item.items
})

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getItems()),
  removeItem: (id) => dispatch(removeItem(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)
