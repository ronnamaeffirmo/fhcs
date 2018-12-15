import { UPDATE_PASSWORD, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actions/userActions'
import reducer from '../reducers/userReducer'

const initialState = {"addingUser": false, "authLoading": false, "currentUser": undefined, "error": undefined, "isAuthenticated": false, "list":  [], "loading": false}

describe('user reducer', () => {
	it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
	})
	
	it('should handle UPDATE_PASSWORD', () => {
		const data = 'password123'
		const action = {type: UPDATE_PASSWORD, payload: data}
		const expectedState = {"action": "password123", "addingUser": false, "authLoading": false, "currentUser": undefined, "error": undefined, "isAuthenticated": false, "list":  [], "loading": false}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})

	it('should handle USER_LOGIN_FAIL', () => {
		const data = 'ERROR LOGIN' 
		const action = {type: USER_LOGIN_FAIL, payload: data}
		const expectedState = {"addingUser": false, "authLoading": false, "currentUser": undefined, "error": "ERROR LOGIN", "isAuthenticated": false, "list":  [], "loading": false}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})

	it('should handle', () => {
		const data = { user: 'Mike Tyson', isAuthenticated: true}
		const action = {type: USER_LOGIN_SUCCESS, payload: data.user, isAuthenticated: data.isAuthenticated }
		const expectedState = {"addingUser": false, "authLoading": false, "currentUser": "Mike Tyson", "err": undefined, "error": undefined, "isAuthenticated": true, "list":  [], "loading": false}
		expect(reducer(undefined, action)).toEqual(expectedState)
	})

	it('should handle USER_LOGOUT', () => {
		const data = { isAuthenticated: false }
		const action = {type: USER_LOGOUT, isAuthenticated: data.isAuthenticated}
		const expectedState = {"addingUser": false, "authLoading": false, "currentUser": undefined, "error": undefined, "isAuthenticated": false, "list":  [], "loading": false}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})
})