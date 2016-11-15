import React from 'react'
import { render } from 'react-dom'
import Greeter from './components/Greeter'
require('./css/main.css')

render((<Greeter />),document.querySelector('#app'))