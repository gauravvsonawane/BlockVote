import { useState } from 'react'
import logo from './logo.svg'
import './App.css' 
import Navbar from './components/Navbar'
import './components/Navbar.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
  
  
    <div className="App">
      <Navbar/>
        
    </div>
  )
}

export default App
