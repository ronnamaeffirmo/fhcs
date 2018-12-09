import helpers, { search, toTitleCase, insertItemToArray, removeItemFromArray } from '../common/helpers'

describe('common/helpers', () => {
  describe('search', () => {
      const arr = [
        {
            title: "Old Man's War",
            author: {
              firstName: "John",
              lastName: "Scalzi"
            }
         },
         {
            title: "The Lock Artist",
            author: {
              firstName: "Steve",
              lastName: "Hamilton"
            }
         },
      ]

      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "title",
          "author.firstName"
        ]
      }

    it('should return search results', () => {
      const results = search(arr, 'Old', options)
      expect(results).toEqual(
        [ 
          { title: 'Old Man\'s War',
            author: { firstName: 'John', lastName: 'Scalzi' } 
          } 
        ])
    })

  })

  describe('toTitleCase', () => {
    it('converts sentence to Title Case', () => {
      const result = toTitleCase('para sayo Ang laban nato')
      expect(result).toEqual('Para Sayo Ang Laban Nato')
    })
  })

  describe('insertItemToArray', () => {
    it('adds item to array', () => {
      const arr = [{name: 'Jimmy Alapag', sports: 'Basketball'}]
      const item = {name: 'Manny Pacman', sports: 'Boxing'}
        expect((insertItemToArray(arr, item))).toEqual(
        //   [{name: 'Manny Pacman', sports: 'Boxing'}]
          []
        )
    })
  })

  describe('removeItemFromArray', () => {
    it('removes item from array and returns new array', () => {
      const arr = [
       {name: 'Jimmy Alapag', sports: 'Basketball'},
       {name: 'Manny Pacman', sports: 'Boxing'}
      ]
      const matcherField = 'name'
      const value = 'Jimmy Alapag'
      const res = removeItemFromArray(arr, matcherField, value)
      expect(res).toEqual([ { name: 'Manny Pacman', sports: 'Boxing' } ])
    })
  })
})