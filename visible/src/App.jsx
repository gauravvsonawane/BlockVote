import { useState } from 'react'
import logo from './logo.svg'
import './App.css' 
import Navbar from './components/Navbar'
import './components/Navbar.css'
import './components/Homepage.css'
import HomePage from './components/homepage'

function App() {
  const [count, setCount] = useState(0)
  
  return (
  
  
    <div className="App">
      <Navbar/>
      <HomePage/>
    </div>
  )
}

export default App
