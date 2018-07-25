import React from 'react'
import { Container } from 'semantic-ui-react'

// containers
import AddItemWrapper from './containers/AddItemWrapperContainer'
import ItemList from './containers/ItemListContainer'

const App = () => (
  <Container>
    <ItemList />
  </Container>
)

export default App
