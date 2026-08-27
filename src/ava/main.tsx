import React from 'react'
import ReactDOM from 'react-dom/client'
import Room from './room.tsx'
import { logVisit } from '../lib/visit_log.ts'
// import './index.css'

logVisit('avas-room')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Room />
  </React.StrictMode>,
)
