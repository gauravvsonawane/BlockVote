import { useState } from 'react'
import './App.css' 
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Footer from './components/footer'
import AdminLogin from './components/adminlogin'
import EciLogin from './components/ecilogin'
import './components/Navbar.css'
import './components/Homepage.css'
import './components/Footer.css'
import './components/Adminlogin.css'
import './components/Ecilogin.css'

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
