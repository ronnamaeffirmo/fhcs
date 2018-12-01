import React from 'react'
import SaleForm from '../components/SaleForm'
import { connect } from 'react-redux'
import { clearFields, formValueSelector, blur } from 'redux-form'
import { getItemSearchList } from '../actions/itemActions'
import { getCustomers } from '../actions/customerActions'
import { addSale } from '../actions/salesAction'

const selector = formValueSelector('saleForm')

class AddSaleContainer extends React.Component {
  componentDidMount () {
    this.props.getItemSearchList()
    this.props.getCustomerSearchList()
  }

  render () {
    return (
      <SaleForm {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  tmp: {
    item: selector(state, 'tmpItem'),
    price: selector(state, 'tmpPrice'),
    quantity: selector(state, 'tmpQuantity'),
    discount: selector(state, 'tmpDiscount'),
  },
  date: selector(state, 'date'),
  term: parseInt(selector(state, 'term')),
  items: itemStateInitializer(state, selector(state, 'items')),
  customerSearchList: state.customer.customers && state.customer.customers.map(customer => ({
    key: customer._id,
    value: customer._id,
    text: customer.firstname + ' ' + customer.lastname
  })),
  itemSearchList: state.item.searchList && state.item.searchList.map(item => {
    return {
      key: item._id,
      value: item._id,
      text: item.name,
      price: item.price
    }
  })
})

const mapDispatchToProps = (dispatch) => ({
  getCustomerSearchList: () => {
    dispatch(getCustomers())
  },
  getItemSearchList: () => {
    dispatch(getItemSearchList())
  },
  clearTmpFields: () => {
    dispatch(clearFields('saleForm', false, false, 'tmpItem', 'tmpPrice', 'tmpQuantity', 'tmpDiscount'))
  },
  updateTmpFields: (price, quantity, discount) => {
    dispatch(blur('saleForm', 'tmpPrice', price))
    dispatch(blur('saleForm', 'tmpQuantity', quantity))
    dispatch(blur('saleForm', 'tmpDiscount', discount))
  },
  submissionHandler: (values) => {
    dispatch(addSale(values))
  }
})

const itemStateInitializer = (state, items) => {
  let initialItemsState = [{}]
  if (items) {
    initialItemsState = items.map(item => {
      return {
        item: state.item.searchList.filter(i => {
          console.log(i._id === item.item)
          return i._id === item.item
        })[0].name,
        price: parseFloat(item.price).toFixed(2),
        quantity: parseInt(item.quantity),
        discount: parseFloat(item.discount).toFixed(2),
        subtotal: (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2),
        total: ((parseFloat(item.price) * parseFloat(item.quantity)) - parseFloat(item.discount)).toFixed(2)
      }
    })
    return initialItemsState
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSaleContainer)
