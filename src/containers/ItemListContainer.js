import { connect } from 'react-redux'

import ItemList from '../components/ItemList'
import { getItems } from '../actions/itemActions'

const mapStateToProps = (state) => ({
  items: state.item.items
})

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getItems())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)
