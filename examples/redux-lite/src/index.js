import React from 'react'
import { render } from 'react-dom'
import { createStore } from './store'
import { Provider } from 'react-redux'
import App from './components/App'

render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
