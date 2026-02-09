import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + TypeScript</h1>
        <p>A basic React shell in TypeScript</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <p className="read-the-docs">
          Edit <code>src/App.tsx</code> to get started
        </p>
      </header>
    </div>
  )
}

export default App
