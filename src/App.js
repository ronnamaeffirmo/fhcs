import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Container } from 'semantic-ui-react'

// import AddItemForm from './containers/AddItemFormContainer'
import LoginFormContainer from './containers/LoginFormContainer'
import DeleteItemFormContainer from './containers/DeleteItemFormContainer'

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Container>
        {/* <AddItemForm onSubmit={(values) => console.log('values', values)} /> */}
        <Route path='/login' component={LoginFormContainer} />
        <Route path='/deleteItems' component={DeleteItemFormContainer} />
        <Route path='/item/:_id' component={DeleteItemFormContainer} />
      </Container>
    </Router>
  </Provider>
)

export default App
