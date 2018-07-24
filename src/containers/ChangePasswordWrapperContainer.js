import { connect } from 'react-redux'
import ChangePasswordWrapper from '../components/ChangePasswordWrapper'

import { updatePassword } from '../actions/userActions'

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (id, password) => dispatch(updatePassword(id, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordWrapper)
