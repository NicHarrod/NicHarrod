import React from 'react'
import ReactDOM from 'react-dom/client'
import Privacy from './privacy.tsx'
import { logVisit } from '../lib/visit_log.ts'

logVisit('privacy')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Privacy />
  </React.StrictMode>,
)
