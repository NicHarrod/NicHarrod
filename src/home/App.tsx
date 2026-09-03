import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div>
      <a href="/avas_room.html">Go to Room</a>
      <br />
      <a href="/portfolio">Go to Portfolio</a>
      <br />
      <a href="/privacy">Privacy</a>
      <Analytics />
    </div>
  )
}

export default App
