import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PrivateRoute from '../components/PrivateRoute'

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
	// nothing fancy here
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute))
