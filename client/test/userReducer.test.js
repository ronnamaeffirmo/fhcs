import { UPDATE_PASSWORD, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actions/userActions'
import reducer from '../reducers/userReducer'

const initialState = {
  currentuser: undefined,
  isAuthenticated: false,
  error: undefined
}

describe('user reducer', () => {
	it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
	})
	
	it('should handle UPDATE_PASSWORD', () => {
		const data = 'password123'
		const action = {type: UPDATE_PASSWORD, payload: data}
		const expectedState = {
			"action": "password123", 
			"currentuser": undefined, 
			"error": undefined, 
			"isAuthenticated": false
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})

	it('should handle USER_LOGIN_FAIL', () => {
		const data = 'ERROR LOGIN' 
		const action = {type: USER_LOGIN_FAIL, payload: data}
		const expectedState = {
			"currentuser": undefined, 
			"error": data, 
			"isAuthenticated": false
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})

	it('should handle', () => {
		const data = { user: 'Mike Tyson', isAuthenticated: true}
		const action = {type: USER_LOGIN_SUCCESS, payload: data.user, isAuthenticated: data.isAuthenticated }
		const expectedState = {
			"currentuser": "Mike Tyson", "err": undefined, "error": undefined, "isAuthenticated": true
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})

	it('should handle USER_LOGOUT', () => {
		const data = { isAuthenticated: false }
		const action = {type: USER_LOGOUT, isAuthenticated: data.isAuthenticated}
		const expectedState = {
			"currentUser": undefined, "currentuser": undefined, "error": undefined, "isAuthenticated": false
		}

		expect(reducer(undefined, action)).toEqual(expectedState)
	})
})