import React from 'react'
import { connect } from 'react-redux'
import InventoryTable from '../components/InventoryTable'
import { filterInventories, getInventories } from '../actions/inventoryActions'

class InventoryTableContainer extends React.Component {
  componentDidMount () {
    this.props.getInventories()
  }

  render () {
    return (
      <InventoryTable {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.inventory.loading,
  inventories: state.inventory.inventories,
  filteredInventories: state.inventory.filteredList.length > 0 ? state.inventory.filteredList : undefined
})

const mapDispatchToProps = dispatch => ({
  getInventories: () => dispatch(getInventories()),
  filterInventories: (searchTerm) => dispatch(filterInventories(searchTerm))
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTableContainer)
