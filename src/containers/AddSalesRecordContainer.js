import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { createSales } from '../actions/salesAction'

import AddSalesRecordForm from '../components/AddSalesRecordForm'

const selector = formValueSelector('sales')

const wrapped = reduxForm({
    form: 'sales',
})(AddSalesRecordForm)

const mapStateToProps = (state) => {
  const { quantity, price } = selector(state, 'quantity', 'price')
  return {
    total: (quantity * price).toFixed(2),
    sale: state.sales.salesRecord,
  }
}

const mapDispatchToProps = (dispatch) => ({
  createSales: (values) => dispatch(createSales(values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrapped)
