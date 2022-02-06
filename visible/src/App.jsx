import { useState } from 'react'
import './App.css' 
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Footer from './components/Footer'
import VoterReg from './components/VoterReg'
import EciLogin from './components/ecilogin'
import AdminLogin from './components/adminlogin'
import Adminreg from './components/adminreg'
import './components/VoterReg.css'
import './components/Navbar.css'
import './components/Homepage.css'
import './components/Footer.css'
import './components/Adminlogin.css'
import './components/Ecilogin.css'
import './components/Adminreg.css'



function App() {
  const [count, setCount] = useState(0)
  
  return (
    // <div className="App">
    <div>
      <Navbar/>
      <Adminreg/>
      <Footer/>
    </div>
  )
}

export default App;
