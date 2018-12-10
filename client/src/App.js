import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginFormContainer from './containers/LoginFormContainer'
import Header from './containers/HeaderContainer'
import Routes from './Routes'

const MainApp = () => (
  <Fragment>
    <Header />
    <Routes />
  </Fragment>
)

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/login' component={LoginFormContainer} />
          <Route path='/' component={MainApp} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
)

export default App
