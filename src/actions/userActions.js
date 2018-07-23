import client from '../common/client'

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

export const updatePassword = (id, password) => {
  return async (dispatch) => {
    // TODO: old pass, new pass, confirm new pass

    const user = await client.service('users').patch(
      id, { password }
    )

    console.log('user', user)
    window.alert('update user password!')

    dispatch({
      type: UPDATE_PASSWORD,
      payload: user
    })
  }
}
