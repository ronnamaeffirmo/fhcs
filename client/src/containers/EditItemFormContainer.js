import { getItem, patchItem } from '../actions/itemActions'
import EditForm from '../components/EditItemForm'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
  const paramsId = props.match.params._id
  if (paramsId) {
    const item = state.item.items.find(item => item._id === paramsId)
    return {item}
  } else {
    return {item: null}
  }
}

const mapDispatchToProps = (dispatch) => ({
  getItem: (id) => dispatch(getItem(id)),
  patchItem: (id, data) => dispatch(patchItem(id, data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm)
