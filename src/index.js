import React from 'react'
import { render } from 'react-dom'

// Para poder utilizar async - await
import regeneratorRuntime from 'regenerator-runtime'

import MainApp from './components/MainApp'

import '../static/css/styles.css'

render(<MainApp />, document.getElementById('app'))
