import React from 'react'
import { connect } from 'react-redux'
import ItemTable from '../components/ItemTable'
import {getItems} from '../actions/itemActions'

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
  items: state.item.list
})

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemTableContainer)
