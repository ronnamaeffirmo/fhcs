import {
    RECEIVE_ROLE,
    UPDATE_ROLE,
    RECEIVE_ROLES
} from '../actions/roleActions'
import reducer from '../reducers/roleReducer'

describe('role reducer', () => {
  it('should return initial state', () => {
    const initialState = {
      list: []
    }
    expect(reducer(undefined, {})).toEqual(initialState)

  })

  it('should handle UPDATE_ROLE', () => {
    const data = {_id: '1', title: 'hollow blocks', permissions: 'owner',}
    const action = {type: UPDATE_ROLE, payload: data}
    const expectedState = {
      "list": [], "selection": {"_id": "1", "permissions": "owner", "title": "hollow blocks"}
    }

    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle RECEIVE_ROLE', () => {
    const data = {_id: '1', title: 'hollow blocks', permissions: 'owner',}
    const action = {type: RECEIVE_ROLE, payload: data}
    const expectedState = {
      "list": [], "selection": {"_id": "1", "permissions": "owner", "title": "hollow blocks"}
    }

    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle RECEIVE_ROLES', () => {
    const data = [{_id: '1', title: 'hammer', permissions: 'all',},{_id: '1', title: 'hollow blocks', permissions: 'owner',}]
    const action = {type: RECEIVE_ROLES, payload: data}
    const expectedState = {
      "list": data,
    }

    expect(reducer(undefined, action)).toEqual(expectedState)
  })
})