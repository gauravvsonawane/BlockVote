import { useState } from 'react'
import './App.css' 
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Footer from './components/Footer'
import VoterReg from './components/VoterReg'
import EciLogin from './components/ecilogin'
import AdminLogin from './components/adminlogin'
import './components/VoterReg.css'
import './components/Navbar.css'
import './components/Homepage.css'
import './components/Footer.css'
import './components/Adminlogin.css'
import './components/Ecilogin.css'



function App() {
  const [components, setComponents] = useState({
                                        "nav-bar" : true,
                                        "footer" : true,
                                        "admin-login" : false,
                                        "admin-reg" : false,
                                        "candidate-reg" : false,
                                        "voter-reg" : true,
                                        "eci-login" : false,
                                        "home-page" : false,  
                                      })
  return (
    // <div className="App">
    <div>
      {components["nav-bar"] && <Navbar/>}
      {components["footer"] && <Footer/>}
      {components["admin-login"] && <AdminLogin/>}
      {components["admin-reg"] && false}
      {components["candidate-reg"] && false}
      {components["voter-reg"] && <VoterReg/>}
      {components["eci-login"] && <EciLogin/>}
      {components["home-page"] && <Homepage/>}
      
      <Footer/>
    </div>
  )
}

export default App;
