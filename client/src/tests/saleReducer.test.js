import {
  REMOVE_SALE,
  RECEIVE_SALES,
  RECEIVE_SALE
  } from '../actions/salesAction'
import reducer from '../reducers/saleReducer'

describe('sales reducer', () => {
	it('should return initial state', () => {
		const initialState = {
			list: [],
		}
		
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle REMOVE_SALE', () => {
		const id = '1'
		const action = {type: REMOVE_SALE, payload: id}
		const expectedState = {"sales": [{"_id": "345", "name": "shovel", "qty": "5", "unit": "pcs"}]}
		
		expect(reducer({
			sales: [{_id: "1", "name": "shovel", "qty": "5", "unit": "pcs"}, {_id: "345", "name": "shovel", "qty": "5", "unit": "pcs"}], 
		}, action)).toEqual(expectedState)
	})

	it('should handle RECEIVE_SALES', () => {
		const datas = [{_id: "1", "name": "shovel", "qty": "5", "unit": "pcs"}]
		const action = {type: RECEIVE_SALES, payload: datas}
		const expectedState = {
			list: datas
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})
})
