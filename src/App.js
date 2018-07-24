import React from 'react'
import { Container } from 'semantic-ui-react'

// containers
import AddItemForm from './containers/AddItemFormContainer'
import ChangePasswordForm from './containers/ChangePasswordFormContainer'

const App = () => (
  <Container>
    <h1>Hello world!</h1>
    {/* <AddItemForm /> */}
    <ChangePasswordForm />
  </Container>
)

export default App
