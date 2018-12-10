import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './containers/HeaderContainer'
import Routes from './Routes'

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Routes />
      </Fragment>
    </Router>
  </Provider>
)

export default App
