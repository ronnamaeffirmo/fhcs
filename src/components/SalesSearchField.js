import React from 'react'
import { Search } from 'semantic-ui-react'

const SalesSearchField = (
  { input, 
    list,
    searchOptions,
    onInputChange, 
    searchValue,
    itemSearchResult,
    onSelectSearchResults,
    label, 
    meta: { touched, error }, 
    ...custom 
  }
) => (
    <div>
      <label>{label}</label>
      {/* {console.log(list)} */}
      {/* {console.log(searchOptions)} */}
      {/* {console.log(itemSearchResult)} */}
      <Search
          {...input}
          onResultSelect={(e, { result }) => onSelectSearchResults(result)}
          onSearchChange={(e, {value}) => onInputChange(value, searchOptions, list)}
          results={itemSearchResult}
          value={searchValue}
          {...custom} 
      />
    </div>
  )

export default SalesSearchField
