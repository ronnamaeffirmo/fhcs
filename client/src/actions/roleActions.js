import {reset} from 'redux-form'
import client from '../common/client'


export const GET_ALL_ROLES = 'GET_ALL_ROLES'
export const ADD_NEW_ROLE = 'ADD_NEW_ROLE'

export const addNewRole = (values) => {
  return async (dispatch) => {
    const {title} = values
    const permissions = []
    for (const param of Object.keys(values)) {
      if (RegExp('(\w*)\:(\w*)').test(param)) {
        const service = param.split(':')[0]
        const serviceParameter = param.split(':')[1]
        if (values[param] === true) {
          permissions.push({
            service,
            param: serviceParameter
          })
        }
      }
    }
    const payload = {title, permissions}
    const result = await client.service('roles').create(payload)
    if (result) {
      dispatch(reset('addRole'))
    }
  }
}

export const getAllRoles = () => {
  return async (dispatch) => {
    const roles = await client.service('roles').find({})
    dispatch({
      type: GET_ALL_ROLES,
      payload: roles.data
    })
  }
}
