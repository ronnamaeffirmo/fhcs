import React from 'react'
import { connect } from 'react-redux'
import InventoryTable from '../components/InventoryTable'
import {getInventories} from '../actions/inventoriesAction'

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
  inventories: state.inventory.inventories,
})

const mapDispatchToProps = dispatch => ({
  getInventories: () => dispatch(getInventories())
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTableContainer)
