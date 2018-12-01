import {
    GET_CUSTOMERS,
    COMPUTE_DATE_TO,
    ON_ITEM_SEARCH,
    ON_ITEM_SEARCH_RESULT,
    BUTTON_ADD_ITEM,
    CANCEL_BUTTON,
    REMOVE_FROM_LIST,
    CREATE_SALES_RECORD,
    GET_SALES,
    REMOVE_SALE
  } from '../actions/salesAction'
import reducer from '../reducers/salesReducer'

const initialState = {
    customer: undefined,
    invoiceNumber: undefined,
    dateFrom: undefined,
    terms: undefined,
    dateTo: undefined,
    remarks: undefined,
    discount: undefined,
    itemLists: [],
    sales: []
}

describe('sales reducer', () => {
  it('should return initial state', () => {
   expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_CUSTOMERS', () => {
    const datas = [{name: 'Pope Francis'},{name: 'San Demo'}]
    const action = {type: GET_CUSTOMERS, payload: datas}
    const expectedState = {
      "customer": undefined, 
      "customers": datas, 
      "dateFrom": undefined, "dateTo": undefined, 
      "discount": undefined, 
      "invoiceNumber": undefined, 
      "itemLists": [], 
      "remarks": undefined, 
      "sales": [], 
      "terms": undefined
    }

    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle COMPUTE_DATE_TO', () => {
    const data = '01/11/2019'
    const action = {type: COMPUTE_DATE_TO, payload: data}
    const expectedState = {
      "customer": undefined, 
      "customers": undefined, 
      "dateFrom": undefined, 
      "dateTo": data, 
      "discount": undefined, 
      "invoiceNumber": undefined, 
      "itemLists": [], 
      "remarks": undefined, 
      "sales": [], 
      "terms": undefined
    }

    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle ON_ITEM_SEARCH', () => {
    const data = 'Hammer'
    const action = {type: ON_ITEM_SEARCH, payload: data}
    const expectedState = {
      searchValue: data,
      customer: undefined,
			invoiceNumber: undefined,
			dateFrom: undefined,
			terms: undefined,
			dateTo: undefined,
			remarks: undefined,
			discount: undefined,
			itemLists: [],
			sales: []
    }

    expect(reducer(undefined, action)).toEqual(expectedState)
	})
	
  it('should handle ON_ITEM_SEARCH_RESULT', () => {
		const data = 'Door Knob'
		const action = {type: ON_ITEM_SEARCH_RESULT, payload: data}
		const expectedState = {
			itemSearchResult: data,
      customer: undefined,
			invoiceNumber: undefined,
			dateFrom: undefined,
			terms: undefined,
			dateTo: undefined,
			remarks: undefined,
			discount: undefined,
			itemLists: [],
			sales: []
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})
	
  it('should handle BUTTON_ADD_ITEM', () => {
		const data = {name: 'Shovel', qty: '6', unit: 'pcs'}
		const action = {type: BUTTON_ADD_ITEM, payload: data}
		const expectedState = {
      customer: undefined,
			invoiceNumber: undefined,
			dateFrom: undefined,
			terms: undefined,
			dateTo: undefined,
			remarks: undefined,
			discount: undefined,
			itemLists: [data],
			sales: []
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})
	
  it('should handle CANCEL_BUTTON', () => {
		const data = {
			customer: undefined,
			invoiceNumber: undefined,
			dateFrom: undefined,
			terms: undefined,
			dateTo: undefined,
			remarks: undefined,
			discount: undefined,
			itemLists: [],
			searchValue: undefined,
			price: undefined
		}
		const expectedState = {
			"customer": undefined, 
			"dateFrom": undefined, 
			"dateTo": undefined, 
			"discount": undefined, 
			"invoiceNumber": undefined, 
			"itemLists": [], 
			"price": undefined, 
			"remarks": undefined, 
			"sales": [], 
			"searchValue": undefined, 
			"terms": undefined
		}
		const action = {type: CANCEL_BUTTON, payload: data}
		expect(reducer(undefined, action)).toEqual(expectedState)
	})
	
  it('should handle REMOVE_FROM_LIST', () => {
		const data = '1'
		const action = {type: REMOVE_FROM_LIST, payload: data}
		const expectedState = {
			"itemLists":  []
		}

		expect(reducer({itemLists: [{_id: '1', name: 'door', qty: '1', unit: 'pcs'}]}, 
			action)).toEqual(expectedState)
	})
	
  it('should handle CREATE_SALES_RECORD', () => {
		const data = {name: 'shovel', qty: '20', price: '100'}
		const action = { type: CREATE_SALES_RECORD, payload: data }
		const expectedState = {
			"customer": undefined, 
			"dateFrom": undefined, 
			"dateTo": undefined, 
			"discount": undefined, 
			"invoiceNumber": undefined, 
			"itemLists": [], 
			"price": undefined, 
			"remarks": undefined, 
			"sales": [data], 
			"searchValue": undefined, 
			"terms": undefined
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})
	
  it('should handle GET_SALES', () => {
		const datas = [{customer: 'Bonifacio', price: '5'},{customer: 'Rizal', price: '1'}]
		const action = {type: GET_SALES, payload: datas}
		const expectedState = {
			"customer": undefined, 
			"dateFrom": undefined, 
			"dateTo": undefined, 
			"discount": undefined, 
			"invoiceNumber": undefined, 
			"itemLists": [], 
			"price": undefined, 
			"remarks": undefined, 
			"sales": datas, 
			"searchValue": undefined, 
			"terms": undefined
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})
	
  it('should handle REMOVE_SALE', () => {
		const data = '1'
		const action = {type: REMOVE_SALE, payload: data}
		const expectedState = {
			"sales": [], 
		} 

		expect(reducer({sales: [{_id: '1', name: 'door', qty: '1', unit: 'pcs'}]}, action)).toEqual(expectedState)
  })
})