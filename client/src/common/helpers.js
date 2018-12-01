import Fuse from 'fuse.js'

export const search = (array, searchTerm, options) => {
  const searcher = new Fuse(array, options)
  return searcher.search(searchTerm)
}

export const toTitleCase = (sentence) => {
  return sentence.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')
}

export const insertItemToArray = (array, item) => {
  let newArray = array.slice()
  return newArray.splice(newArray.length, 0, item)
}

export const removeItemFromArray = (array, matcherField, value) => {
  let newArray = array.slice()
  return newArray.filter(obj => obj[matcherField] !== value)
}