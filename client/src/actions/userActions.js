import client from '../common/client'
import { toastError, toastSuccess, toastInfo } from './toasterActions'
import { reset } from 'redux-form'

// APPLICATION ACCESS
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
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
export const SELECT_USER = 'SELECT_USER'
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
export const ADD_USER_FAIL = 'ADD_USER_FAIL'
export const FINISH_USERS_LOADING = 'FINISH_USERS_LOADING'
export const START_USERS_LOADING = 'START_USERS_LOADING'

export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_USERS_LOADING })
      const users = await client.service('users').find({
        query: {
          $populate: 'role'
        }
      })
      if (users) {
        dispatch({
          type: RECEIVE_USERS,
          payload: users.data
        })
        dispatch({ type: FINISH_USERS_LOADING })
      }
    } catch (e) {
      dispatch({ type: FINISH_USERS_LOADING })
      toastError({message: e.message})
    }
  }
}

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_USER_REQUEST}) // actually being reused among add, get, edit lol -R
      const newUser = await client.service('users').create(user)
      if (newUser) {
        dispatch({
          type: ADD_USER,
          payload: user
        })
        dispatch(reset('userForm'))
        toastSuccess({message: `User @${user.username.toLowerCase()} has been created!`})
      }
    } catch (e) {
      toastError({message: e.message})
      dispatch({type: ADD_USER_FAIL})
    }
  }
}

export const editUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_USER_REQUEST})
      const updatedUser = await client.service('users').patch(user._id, user)
      updatedUser.role = updatedUser.role._id
      dispatch({
        type: RECEIVE_USER,
        payload: updatedUser
      })
    } catch (e) {
      toastError({message: e.message})
      dispatch({type: ADD_USER_FAIL})
    }
  }
}

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_USER_REQUEST})
      const user = await client.service('users').get(id, {
        query: {
          $populate: 'role'
        }
      })
      user.role = user.role._id
      if (user) {
        dispatch({
          type: RECEIVE_USER,
          payload: user
        })
      }
    } catch (e) {
      dispatch({type: ADD_USER_FAIL})
      toastError({message: e.message})
    }
  }
}

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      toastInfo({ message: 'Deleting user...' })
      const result = await client.service('users').remove(userId)
      if (result) {
        dispatch({
          type: DELETE_USER,
          payload: userId
        })
        toastSuccess({message: 'User has been deleted'})
      }
    } catch (e) {
      toastError({message: e.message})
    }
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

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({type: USER_LOGIN_REQUEST})
    let token
    if (!username || !password) {
      if (!localStorage.getItem('feathers-jwt')) {
        dispatch({type: USER_LOGIN_FAIL})
        return
      }
      token = await client.authenticate()
      if (!token) {
        new Error('Your session has expired! Please login again.')
      }
    } else {
      token = await client.authenticate({
        strategy: 'local',
        username,
        password
      })
      if (!token) {
        new Error('Invalid login!')
      }
    }
    const payload = await client.passport.verifyJWT(token.accessToken)
    const user = await client.service('users').get(payload.userId, {
      query: {$populate: ['role']}
    })
    if (user) {
      toastSuccess({message: 'Successfully logged in!'})
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
        isAuthenticated: true
      })
    }
  } catch (e) {
    dispatch({type: USER_LOGIN_FAIL})
    toastError({message: e.message})
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await client.logout()
      dispatch({
        type: USER_LOGOUT,
        isAuthenticated: false
      })
      toastSuccess({message: 'You have been logged out!'})
    } catch (e) {
      toastError({message: e.message})
    }
  }
}
