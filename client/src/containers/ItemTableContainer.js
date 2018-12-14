import React from 'react'
import { connect } from 'react-redux'
import ItemTable from '../components/ItemTable'
import { filterItems, getItems } from '../actions/itemActions'

class ItemTableContainer extends React.Component {
  componentDidMount () {
    this.props.getItems()
  }

  render () {
    return (
      <ItemTable {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  items: state.item.list,
  filteredItems: state.item.filteredList.length > 0 ? state.item.filteredList : undefined
})

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
  filterItems: (searchTerm) => dispatch(filterItems(searchTerm))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemTableContainer)
