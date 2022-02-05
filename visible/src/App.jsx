import { useState } from 'react'
import logo from './logo.svg'
import './App.css' 
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Footer from './components/footer'
import './components/Navbar.css'
import './components/Homepage.css'
import './components/Footer.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
  
  
    <div className="App">
      <Navbar/>
      <Homepage/>
      <Footer/>
    </div>
  )
}

export default App;
