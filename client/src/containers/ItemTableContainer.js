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
  loading: state.item.loading,
  filteredItems: state.item.filteredList.length > 0 ? state.item.filteredList : undefined,
  items: state.item.list
})

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
  filterItems: (searchTerm) => dispatch(filterItems(searchTerm))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemTableContainer)
