import { reset } from 'redux-form'
import client from '../common/client'
import { toTitleCase } from '../common/helpers'
import { toastError } from './toasterActions'

export const UPDATE_ROLE = 'UPDATE_ROLE'
export const RECEIVE_ROLE = 'RECEIVE_ROLE'
export const RECEIVE_ROLES = 'RECEIVE_ROLES'

export const getRole = (id) => {
  return async (dispatch) => {
    try {
      const result = await client.service('roles').get(id)
      if (result.permissions.length > 0) {
        result.permissions = result.permissions.map(permission => {
          if (permission.split(':')[1] === '*') {
            return permission.split(':')[0] + ':all'
          }
          return permission
        })
      }
      const payload = {title: result.title, permissions: result.permissions, id: result._id}
      dispatch({
        type: RECEIVE_ROLE,
        payload: payload
      })
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

const parseRoleFormData = (values) => {
  const {title} = values
  const permissions = []
  for (const param of Object.keys(values)) {
    if (RegExp('(w*):(w*)').test(param)) {
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
  return {title, permissions}
}

export const parseRoleDataToForm = (role) => {
  if (role) {
    const result = {}
    result.id = role.id
    result.title = toTitleCase(role.title)
    for (const serviceParamPair of role.permissions) {
      result[serviceParamPair] = true
    }
    return result
  }
}

export const addNewRole = (values) => {
  return async (dispatch) => {
    try {
      const payload = parseRoleFormData(values)
      const result = await client.service('roles').create(payload)
      if (result) {
        dispatch(reset('roleForm'))
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const updateRole = (values) => {
  return async (dispatch) => {
    try {
      const payload = parseRoleFormData(values)
      const result = await client.service('roles').update(values.id, payload)
      if (result) {
        dispatch({
          type: UPDATE_ROLE,
          payload
        })
      }
    } catch (e) {
      toastError({message: e.message})
    }
  }
}

export const getRoles = () => {
  return async (dispatch) => {
    try {
      const roles = await client.service('roles').find({})
      const payload = roles.data
      dispatch({
        type: RECEIVE_ROLES,
        payload: payload
      })
    } catch (e) {
      toastError({message: e.message})
    }

  }
}
