import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { logVisit } from '../lib/visit_log.ts'
// import './index.css'

logVisit('home')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
