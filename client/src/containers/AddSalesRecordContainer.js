import { connect } from 'react-redux'
import { formValueSelector as selector, reduxForm } from 'redux-form'

import { getItems } from '../actions/itemActions'
import {
  createSales,
  getCustomers,
  onCustomerDropdownChange,
  onInvoiceNumberChange,
  onCalendarDateChange,
  onNetTermsChange,
  onRemarksChange,
  onItemSearch,
  onSelectSearchResult,
  onPriceChange,
  onDiscountChange,
  onQuantityChange,
  buttoAddItem,
  cancelButton,
  removeFromList,
  createSalesRecord
} from '../actions/salesAction'

import AddSalesRecordForm from '../components/AddSalesRecordForm'

const wrapped = reduxForm({
  form: 'sales'
})(AddSalesRecordForm)

const mapStateToProps = (state) => {
  const gTotal = state.sales.itemLists.reduce((a, b) => a + b.total, 0)
  const { quantity, price } = selector(state, 'quantity', 'price')
  return {
    total: (quantity * price).toFixed(2),
    sale: state.sales.salesRecord,
    customers: state.sales.customers,
    items: state.item.items,
    customer: state.sales.customer,
    invoiceNumber: state.sales.invoiceNumber,
    dateFrom: state.sales.dateFrom,
    terms: state.sales.terms,
    dateTo: state.sales.dateTo,
    remarks: state.sales.remarks,
    searchValue: state.sales.searchValue,
    itemSearchResult: state.sales.itemSearchResult,
    selectedResult: state.sales.selectedResult,
    price: state.sales.price,
    discount: state.sales.discount,
    quantity: state.sales.quantity,
    itemLists: state.sales.itemLists,
    grandTotal: gTotal
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCustomers: () => dispatch(getCustomers()),
  getItems: () => dispatch(getItems()),
  onCustomerDropdownChange: (customer) => dispatch(onCustomerDropdownChange(customer)),
  onInvoiceNumberChange: (value) => dispatch(onInvoiceNumberChange(value)),
  onCalendarDateChange: (dateFrom, netValue) => dispatch(onCalendarDateChange(dateFrom, netValue)),
  onNetTermsChange: (dateFrom, netValue) => dispatch(onNetTermsChange(dateFrom, netValue)),
  onRemarksChange: (remarks) => dispatch(onRemarksChange(remarks)),
  onItemSearch: (searchValue, options, list) => dispatch(onItemSearch(searchValue, options, list)),
  onSelectSearchResult: (results) => dispatch(onSelectSearchResult(results)),
  onPriceChange: (price) => dispatch(onPriceChange(price)),
  onDiscountChange: (discount) => dispatch(onDiscountChange(discount)),
  onQuantityChange: (quantity) => dispatch(onQuantityChange(quantity)),
  buttoAddItem: (item, price, quantity, discount) => dispatch(buttoAddItem(item, price, quantity, discount)),
  clearData: () => dispatch(cancelButton()),
  removeFromList: (list, item) => dispatch(removeFromList(list, item)),
  createSalesRecord: (data) => dispatch(createSalesRecord(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapped)
