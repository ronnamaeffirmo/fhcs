import { connect } from 'react-redux'

import InventoryList from '../components/InventoryList'
import { getInventories, removeInventory, filterInventories } from '../actions/inventoriesAction'

const mapStateToProps = (state) => ({
  inventories: state.inventory.inventories,
  filteredInventories: state.inventory.filteredInventories.length > 0 ? state.inventory.filteredInventories : undefined
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
