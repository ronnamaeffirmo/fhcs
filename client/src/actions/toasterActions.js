import iziToast from 'izitoast'

export const toastSuccess = (options) => {
  options = {
    title: 'SUCCESS',
    position: 'topLeft',
    timeout: 5000,
    ...options
  }
  iziToast.success(options)
}
