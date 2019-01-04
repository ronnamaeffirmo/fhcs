import { GET_INVENTORIES } from '../../actions/inventoryActions'
import reducer from '../../reducers/inventoryReducer'

describe('inventory reducer', () => {
  it('should return initial state', () => {
    const initialState = {"filteredList":  [], "gettingInventory": false, "inventories":  [], "inventory": {}, "loading": false}
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_INVENTORIES', () => {
    const datas = [{name: 'door knob', qty: '4', unit: 'pcs'},{name: 'hollow block', qty: '10', unit: 'pcs'}]
    const action = {type: GET_INVENTORIES, payload: datas}
    const expectedState = {"filteredList":  [], "gettingInventory": false, "inventories": [{"name": "door knob", "qty": "4", "unit": "pcs"}, {"name": "hollow block", "qty": "10", "unit": "pcs"}], "inventory": {}, "loading": false}

    expect(reducer(undefined, action)).toEqual(expectedState)
  })
})
