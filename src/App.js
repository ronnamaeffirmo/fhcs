import React from 'react'
import { Container } from 'semantic-ui-react'

// containers
import AddItemForm from './containers/AddItemFormContainer'

// actions
import { createItem } from './actions/items'

const App = () => (
  <Container>
    <AddItemForm onSubmit={createItem} />
  </Container>
)

export default App
