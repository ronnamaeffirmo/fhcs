import React from 'react'
import { Container } from 'semantic-ui-react'

import AddItemForm from './containers/AddItemFormContainer'

const App = () => (
  <Container>
    <AddItemForm onSubmit={(values) => console.log('values', values)} />
  </Container>
)

export default App
