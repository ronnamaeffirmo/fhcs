import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ItemReports from '../components/ItemReports'

const wrapped = reduxForm({
  form: 'period'
})(ItemReports)

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapped)
