import {
    ADD_ITEM,
    FILTER_ITEMS,
    GET_ITEM,
    GET_ITEMS,
    PATCH_ITEM,
    REMOVE_ITEM,
    REMOVE_ITEM_ERROR,
    SELECT_REPORT
  } from '../actions/itemActions'
import reducer from '../reducers/itemReducer'

describe('item reducer', () => {
  it('should return initial state', () => {
    const initialState = {
      list: [],
      filteredList: [],
      report: 'sales'
    }
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ADD_ITEM', () => {
    const data = {name: 'shovel', unit: 'pcs', qty: '3'}
    const action = {type: ADD_ITEM, payload: data}
    const expectedState = {
      "filteredList": [], "item": {"name": "shovel", "qty": "3", "unit": "pcs"}, "list": [{"name": "shovel", "qty": "3", "unit": "pcs"}], "report": "sales"
    }
    expect(reducer(undefined, action)).toEqual(expectedState)
  })
  
  it ('should handle GET_ITEM', () => {
    const data = {name:'shovel', unit: 'pcs', qty: '5'}
    const action = {type: GET_ITEM, payload: data}
    const expectedState = {
      "filteredList": [], 
      "list": [data], 
      "report": "sales"
    }
    expect(reducer(undefined, action)).toEqual(expectedState)
  })
  it ('should handle GET_ITEMS', () => {
    const datas = [
      {name:'shovel', unit: 'pcs', qty: '5'}, 
      {name:'shovel', unit: 'pcs', qty: '5'}
    ]
    const action ={type: GET_ITEMS, payload: datas}
    const expectedState = {
      "filteredList": [], 
      "list": datas, 
      "report": "sales"
    }
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it ('should handle PATCH_ITEM', () => {
    const data = {_id: '123', name:'shovel', unit: 'kg', qty: '5'}
    const action = {type: PATCH_ITEM, payload: data}
    const expectedState ={
      "filteredList": [], 
      "list": [{_id: "123", "name": "shovel", "qty": "5", "unit": "kg"}, {"name": "shovel", "qty": "5", "unit": "pcs"}], 
      "report": "sales"
    }

    expect(reducer( {
      "filteredList": [], 
      "list": [{_id: "123", "name": "shovel", "qty": "5", "unit": "pcs"}, {"name": "shovel", "qty": "5", "unit": "pcs"}], 
      "report": "sales"
    }, action)).toEqual(expectedState)

  })

  it ('should handle REMOVE_ITEM', () => {
    const data = "123"
    const action = {type: REMOVE_ITEM, payload: data}
    const expectedState ={
      "filteredList": [], 
      "list": [{
        _id: "345", 
        "name": "shovel", 
        "qty": "5", 
        "unit": "pcs"}], 
      "report": "sales"
    }

    expect(reducer({
        "filteredList": [], 
        "list": [{_id: "123", "name": "shovel", "qty": "5", "unit": "pcs"}, {_id: "345", "name": "shovel", "qty": "5", "unit": "pcs"}], 
        "report": "sales"
    }, action)).toEqual(expectedState)
  })

  it ('should handle REMOVE_ITEM_ERROR', () => {
    const error = 'REMOVE_ITEM error'
    const action = {type: REMOVE_ITEM_ERROR, payload: error}
    const expectedState ={
      "filteredList": [], 
      "list": [], 
      "report": "sales",
      error: error
    }
    expect(reducer(undefined, action)).toEqual(expectedState)
  })
  
  it ('should handle SELECT_REPORT', () => {
    const data = 'sales'
    const action = {type: SELECT_REPORT, payload: data}
    const expectedState ={
      "filteredList": [], 
      "list": [], 
      "report": data,
    }
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

})