import Fuse from 'fuse.js'

export const search = (array, searchTerm, options) => {
  const searcher = new Fuse(array, options)
  return searcher.search(searchTerm)
}

export const toTitleCase = (sentence) => {
  return sentence.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')
}
