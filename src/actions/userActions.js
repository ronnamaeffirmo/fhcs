import client from '../common/client'

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
export const USER_LOGOUT = 'USER_LOGOUT'

export const updatePassword = ({id, oldpassword, newpassword, confirmpassword}) => {
  return async (dispatch) => {
    // TODO: old pass, confirm new pass

    const user = await client.service('users').patch(
      // id, { password }
      '5b56313f73997f1c3be24c6d', {password: newpassword} // dummy for now
    )

    console.log('[!] user', user)
    window.alert('Updated user password!')

    dispatch({
      type: UPDATE_PASSWORD,
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
