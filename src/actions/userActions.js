import client from '../common/client'

export const ADD_USER = 'ADD_USER'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT = 'USER_LOGOUT'

export const createUser = (values) => {
  return async (dispatch) => {
    const user = await client.service('users').create(values)

    console.log('USER: ', user)
    window.alert('user added successfully')

    dispatch({
      type: ADD_USER,
      payload: user
    })
  }
}

export const login = (username, password) => async (dispatch) => {
  try {
    const token = await client.authenticate({
      strategy: 'local',
      username,
      password
    })

    const payload = await client.passport.verifyJWT(token.accessToken)
    const user = await client.service('users').get(payload.userId)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
      isAuthenticated: true
    })
  } catch (err) {
    return dispatch({
      type: USER_LOGIN_FAIL,
      payload: err
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    await client.logout()

    return dispatch({
      type: USER_LOGOUT,
      isAuthenticated: false
    })
  } catch (e) {
    console.log(e)
  }
}
