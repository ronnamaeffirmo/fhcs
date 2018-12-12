import Fuse from 'fuse.js'
import { toastError } from '../actions/toasterActions'

export const search = (array, searchTerm, options) => {
  const searcher = new Fuse(array, options)
  return searcher.search(searchTerm)
}

export const toTitleCase = (sentence) => {
  try {
    return sentence.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')
  } catch (e) {
    toastError({message: e.message})
    return 'ERROR'
  }

}

export const insertItemToArray = (array, item) => {
  let newArray = array.slice()
  return newArray.splice(newArray.length, 0, item)
}

export const removeItemFromArray = (array, matcherField, value) => {
  let newArray = array.slice()
  return newArray.filter(obj => obj[matcherField] !== value)
}

export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}