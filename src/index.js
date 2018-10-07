import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// redux
import store from './common/store'

ReactDOM.render(<App store={store}/>,
  document.getElementById('root')
)
registerServiceWorker()
