import {
  REMOVE_SALE,
  RECEIVE_SALES,
  RECEIVE_SALE
  } from '../actions/saleActions'
import reducer from '../reducers/saleReducer'

describe('sales reducer', () => {
	it('should return initial state', () => {
		const initialState = {"filteredList":  [], "list":  [], "loading": false}
		
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle REMOVE_SALE', () => {
		const id = '1'
		const action = {type: REMOVE_SALE, payload: id}
		const expectedState = {"list": [{"_id": "345", "name": "shovel", "qty": "5", "unit": "pcs"}]}
		
		expect(reducer({
			list: [{_id: "1", "name": "shovel", "qty": "5", "unit": "pcs"}, 
			  {_id: "345", "name": "shovel", "qty": "5", "unit": "pcs"}], 
		}, action)).toEqual(expectedState)
	})

	it('should handle RECEIVE_SALES', () => {
		const datas = [{_id: "1", "name": "shovel", "qty": "5", "unit": "pcs"}]
		const action = {type: RECEIVE_SALES, payload: datas}
		const expectedState = {"filteredList":  [], "list": [{"_id": "1", "name": "shovel", "qty": "5", "unit": "pcs"}], "loading": false}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})
})
