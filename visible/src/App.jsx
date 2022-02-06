import { useState, useEffect } from 'react'
import './App.css' 
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Footer from './components/Footer'
import VoterReg from './components/VoterReg'
import EciLogin from './components/ecilogin'
import AdminLogin from './components/adminlogin'
import Adminreg from './components/adminreg'
import Results from './components/Results'
import './components/VoterReg.css'
import './components/Navbar.css'
import './components/Homepage.css'
import './components/Footer.css'
import './components/Adminlogin.css'
import './components/Ecilogin.css'
import './components/Adminreg.css'

function App() {
 
  const [components, setComponents] = useState({
                                        "nav-bar" : true,
                                        "footer" : true,
                                        "admin-login" : false,
                                        "admin-reg" : false,
                                        "candidate-reg" : false,
                                        "voter-reg" : false,
                                        "eci-login" : false,
                                        "home-page" : true,
                                        "results" : false
                                      })
    const resetComponents = () => {
      setComponents({
        "nav-bar" : false,
        "footer" : false,
        "admin-login" : false,
        "admin-reg" : false,
        "candidate-reg" : false,
        "voter-reg" : false,
        "eci-login" : false,
        "home-page" : false
      });
    };

    const ECIcallback = () => {
      resetComponents();
      setComponents({
        "eci-login":true,  
        "nav-bar" : true,
        "footer" : true}
        );
    }
    
    const AdminLogCallback = () => {
      resetComponents();
      setComponents({
        "admin-login":true,  
        "nav-bar" : true,
        "footer" : true
      });
    }

    const HomeCallBack = () => {
      resetComponents();
      setComponents({
        "home-page":true, 
        "nav-bar" : true,
        "footer" : true
      })
    }

    const ResultsCallBack = () => {
      resetComponents();
      setComponents({
        "results":true, 
        "nav-bar" : true,
        "footer" : true
      })
    }
    const AdminRegCallBack = () => {
      resetComponents();
      setComponents({
        "nav-bar":true, 
        "admin-reg" : true,
        "footer" : true
      })
    }
    const VoterRegCallBack = () => {
      resetComponents();
      setComponents({
        "nav-bar":true, 
        "voter-reg" : true,
        "footer" : true
      })
    }
  return ( 
    <div>
      {components["nav-bar"] && <Navbar 
      callback_eci={ECIcallback} 
      callback_admin_log={AdminLogCallback}
      callback_results={ResultsCallBack}
      />}
      {components["footer"] && <Footer/>}
      {components["admin-login"] && <AdminLogin callback_voter_reg={VoterRegCallBack}/>}
      {components["admin-reg"] && <Adminreg/>}
      {components["candidate-reg"] && false}
      {components["voter-reg"] && <VoterReg />}
      {components["eci-login"] && <EciLogin callback_admin_reg={AdminRegCallBack}/>}
      {components["home-page"] && <Homepage/>}
      {components["results"] && <Results/>}
    </div>
  )
}

export default App;
