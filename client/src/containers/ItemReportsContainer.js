import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ItemReports from '../components/ItemReports'
import { getInventories } from '../actions/inventoriesAction'
import { selectReport } from '../actions/itemActions'

const wrapped = reduxForm({
  form: 'period',
  onChange: (values, dispatch, props, previousValues) => {
    props.submit(values)
  }
})(ItemReports)

const mapStateToProps = (state) => ({
  inventories: state.inventory.inventories,
  report: state.item.report
})

const mapDispatchToProps = (dispatch) => ({
  getInventories: (values) => dispatch(getInventories(values)),
  selectReport: (report) => dispatch(selectReport(report))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapped)
