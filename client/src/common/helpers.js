import Fuse from 'fuse.js'

export const search = (array, searchTerm, options) => {
  const searcher = new Fuse(array, options)
  return searcher.search(searchTerm)
}
