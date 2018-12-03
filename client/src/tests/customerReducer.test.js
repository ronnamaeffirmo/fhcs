import { ADD_CUSTOMER } from '../actions/customerActions'
import reducer from '../reducers/customerReducer'

describe('customer reducer', () => {
  it('should return the initial state', () => {
    const initialState = { customers: [], filteredCustomers:  [] }
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ADD_CUSTOMER', () => {
    const data = {name: 'customer1'}
    const action = { type: ADD_CUSTOMER, payload: data}
    const expectedState = { customer: {"name": "customer1"}, customers: [{"name": "customer1"}], filteredCustomers: [] }
    
    expect(reducer(undefined, action)).toEqual(expectedState)
  })
})