
export const login = (api, username, password) => async (dispatch) => {
  try {
    const token = await api.authenticate({
      username,
      password,
      strategy: 'local'
    })
    const payload = await api.passport.verifyJWT(token.accessToken)
    const user = await api.service('/users').get(payload.userId)
    dispatch({ type: 'USER_AUTHENTICATE_SUCCESS', payload: user, isAuthenticated: true })
  } catch (err) {
    return dispatch({ type: 'USER_AUTHENTICATE_FAIL', payload: err })
  }
}

export const logout = api => async (dispatch) => {
  try {
    await api.logout()
    return dispatch({ type: 'USER_LOGOUT', isAuthenticated: false })
  } catch (e) {
    console.log(e)
  }
}
