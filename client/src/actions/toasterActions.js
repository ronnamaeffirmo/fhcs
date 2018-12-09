import iziToast from 'izitoast'

export const getOptions = () => ({
  position: 'topLeft',
  timeout: 5000,
})

export const toastSuccess = (options) => {
  options = {
    ...getOptions(),
    title: 'SUCCESS!',
    ...options
  }
  iziToast.success(options)
}

export const toastError = (options) => {
  options = {
    ...getOptions(),
    title: 'ERROR!',
    ...options
  }
  iziToast.error(options)
}
