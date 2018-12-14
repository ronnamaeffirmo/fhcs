import { reset } from 'redux-form'
import client from '../common/client'
import { toTitleCase } from '../common/helpers'
import { toastError, toastSuccess, toastInfo } from './toasterActions'

export const UPDATE_ROLE = 'UPDATE_ROLE'
export const RECEIVE_ROLE = 'RECEIVE_ROLE'
export const RECEIVE_ROLES = 'RECEIVE_ROLES'
export const START_ROLES_LOADING = 'START_ROLES_LOADING'
export const FINISH_ROLES_LOADING = 'FINISH_ROLES_LOADING'
export const REMOVE_ROLE = 'REMOVE_ROLE'

export const getRole = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_ROLES_LOADING })
      const result = await client.service('roles').get(id)
      if (result.permissions.length > 0) {
        result.permissions = result.permissions.map(permission => {
          if (permission.split(':')[1] === '*') {
            return permission.split(':')[0] + ':all'
          }
          return permission
        })
        const payload = {title: result.title, permissions: result.permissions, id: result._id}
        dispatch({
          type: RECEIVE_ROLE,
          payload: payload
        })
        dispatch({ type: FINISH_ROLES_LOADING })
        toastSuccess({message: 'Role fetched from database!'})
      }
    } catch (e) {
      dispatch({ type: FINISH_ROLES_LOADING })
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
      dispatch({ type: START_ROLES_LOADING })
      const payload = parseRoleFormData(values)
      const result = await client.service('roles').create(payload)
      if (result) {
        dispatch(reset('roleForm'))
        dispatch({ type: FINISH_ROLES_LOADING })
        toastSuccess({message: 'Role has been successfully saved!'})
      }
    } catch (e) {
      dispatch({ type: FINISH_ROLES_LOADING })
      toastError({message: e.message})
    }
  }
}

export const updateRole = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_ROLES_LOADING })
      const payload = parseRoleFormData(values)
      const result = await client.service('roles').update(values.id, payload)
      if (result) {
        dispatch({
          type: UPDATE_ROLE,
          payload
        })
        dispatch({ type: FINISH_ROLES_LOADING })
        toastSuccess({message: 'Role has been successfully updated!'})
      }
    } catch (e) {
      dispatch({ type: FINISH_ROLES_LOADING })
      toastError({message: e.message})
    }
  }
}

export const getRoles = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_ROLES_LOADING })
      const roles = await client.service('roles').find({})
      const payload = roles.data
      if (roles) {
        dispatch({
          type: RECEIVE_ROLES,
          payload: payload
        })
        toastSuccess({message: 'List of roles has been updated!'})
      }
      dispatch({ type: FINISH_ROLES_LOADING })
    } catch (e) {
      dispatch({ type: FINISH_ROLES_LOADING })
      toastError({message: e.message})
    }
  }
}

export const removeRole = (id) => {
  return async (dispatch) => {
    try {
      toastInfo({ message: 'Removing role record...' })
      const deleted = await client.service('roles').remove(id)
      if (deleted) {
        dispatch({
          type: REMOVE_ROLE,
          payload: id
        })
        toastSuccess({ message: 'Role record has been successfully removed!' })
      }
    } catch (e) {
      toastError({ message: e.message })
    }
  }
}
