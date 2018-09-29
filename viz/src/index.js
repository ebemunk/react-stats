import React from 'react'
import ReactDOM from 'react-dom'

import Root from './Report'

const render = (component, selector) =>
  ReactDOM.render(component, document.querySelector(selector))

render(<Root />, '#root')
