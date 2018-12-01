import { GET_INVENTORIES } from '../actions/inventoriesAction'
import reducer from '../reducers/inventoryReducer'

describe('inventory reducer', () => {
  it('should return initial state', () => {
    const initialState = { inventories: [] }
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_INVENTORIES', () => {
    const datas = [{name: 'door knob', qty: '4', unit: 'pcs'},{name: 'hollow block', qty: '10', unit: 'pcs'}]
    const action = {type: GET_INVENTORIES, payload: datas}
    const expectedState = { inventories: datas}
    
    expect(reducer(undefined, action)).toEqual(expectedState)
  })
})