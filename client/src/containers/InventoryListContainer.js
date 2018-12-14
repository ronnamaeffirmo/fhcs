import { connect } from 'react-redux'

import InventoryList from '../components/InventoryList'
import { getInventories, removeInventory, filterInventories } from '../actions/inventoryActions'

const mapStateToProps = (state) => ({
  loading: state.inventory.loading,
  inventories: state.inventory.inventories,
  filteredInventories: state.inventory.filteredList.length > 0 ? state.inventory.filteredList : undefined
})

const mapDispatchToProps = (dispatch) => ({
  getInventories: () => dispatch(getInventories()),
  removeInventory: (id) => dispatch(removeInventory(id)),
  filterInventories: (searchTerm) => dispatch(filterInventories(searchTerm))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryList)
