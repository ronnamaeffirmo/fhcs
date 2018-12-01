import { getCustomers } from '../actions/customerActions'
import { getItemSearchList } from '../actions/itemActions'
import { blur, clearFields } from 'redux-form'

export const getSaleContainerDispatchers = (dispatch) => {
  return {
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
  }
}
