import { connect } from 'react-redux'
import AddUserWrapper from '../components/AddUserWrapper'
import { createUser } from '../actions/userActions'

const mapDispatchToProps = (dispatch) => ({
  createUser: (values) => dispatch(createUser(values))
})

export default connect(
  null,
  mapDispatchToProps
)(AddUserWrapper)
