import client from '../common/client'

export const ADD_USER = 'ADD_USER'

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
