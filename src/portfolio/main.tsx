import React from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './portfolio'
import { logVisit } from '../lib/visit_log.ts'

logVisit('portfolio')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>,
)
