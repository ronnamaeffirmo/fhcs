import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Container } from 'semantic-ui-react'

// import AddItemForm from './containers/AddItemFormContainer'
import LoginFormContainer from './containers/LoginFormContainer'

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Container>
        {/* <AddItemForm onSubmit={(values) => console.log('values', values)} /> */}
        <Route path="/login" component={LoginFormContainer} />
      </Container>
    </Router>
  </Provider>
)

export default App
