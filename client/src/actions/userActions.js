import client from '../common/client'

// APPLICATION ACCESS
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT = 'USER_LOGOUT'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

// ADMINISTRATION
export const ADD_USER = 'ADD_USER'
export const GET_USER = 'GET_USER'
export const GET_USERS = 'GET_USERS'
export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

export const getUsers = async () => {
  return await client.service('users').find({})
}

export const receiveUsers = (users) => {
  return (dispatch) => {
    console.log('USERS', users)
    dispatch({
      type: RECEIVE_USERS,
      payload: users.data
    })
  }
}

export const updatePassword = (values) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_PASSWORD,
      payload: values
    })
  }
}

export const createUser = (values) => {
  return async (dispatch) => {
    const user = await client.service('users').create(values)
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
