import { connect } from 'react-redux'

import ItemList from '../components/ItemList'
import { getItems, removeItem, filterItems } from '../actions/itemActions'

const mapStateToProps = (state) => ({
  items: state.item.list,
  filteredItems: state.item.filteredList.length > 0 ? state.item.filteredList : undefined
})

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getItems()),
  removeItem: (id) => dispatch(removeItem(id)),
  filterItems: (searchTerm) => dispatch(filterItems(searchTerm))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)
