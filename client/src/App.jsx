import React, { useState, useEffect } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import "./App.css";

import Navbar from './components/Navbar'
import Navbar2 from './components/Navbar2'
import Navbar3 from './components/Navbar3'
import Homepage from './components/Homepage'
import Footer from './components/Footer'
import VoterReg from './components/VoterReg'
import EciLogin from './components/EciLogin'
import AdminLogin from './components/AdminLogin'
import Adminreg from './components/AdminReg'
import Results from './components/Results'
import OTPWin from './components/OTPWin'
import Votewindow from './components/Votewindow'
import BlockVote from "./contracts/BlockVote.json";
import { getDatabase, ref, child, get } from "firebase/database";

const App = () => {
  
  const [dbStatus, setDBStatus] = useState("Connecting to Firebase...");
  const [dbValue, setDBValue] = useState("");

  const [electionStatus, setElectionStatus] = useState(false);
  const [Web3States, setWeb3States] = useState();


  const getAndSetWeb3 = async() =>{

    try {
        const w3 = await getWeb3();
        const acc = await w3.eth.getAccounts();
        const networkId = await w3.eth.net.getId();
        const deployedNetwork = BlockVote.networks[networkId];
        const instance = new w3.eth.Contract(BlockVote.abi, deployedNetwork && deployedNetwork.address);

        setWeb3States({web3:w3, accounts:acc, contractInst:instance});
        

      } catch(error){
        alert('Failed to load web3, accounts, or contract. Check console for details.');
        console.error(error);
      }
}
  
 

  

  const firebaseDemo = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Value`)).then((snapshot) => {
      if (snapshot.exists()) {
        setDBValue(snapshot.val());
      } else {
        setDBValue("No data available");
      }
      setDBStatus("Connected!");
    }).catch((error) => {
      console.error(error);
      setDBStatus("An error occured..");
    });
  }

  useEffect(() => {
    getAndSetWeb3();
    firebaseDemo();
  },[]);

const [components, setComponents] = useState({
  "nav-bar" : true,
  "footer" : true,
  "admin-login" : false,
  "admin-reg" : false,
  "candidate-reg" : false,
  "voter-reg" : false,
  "eci-login" : false,
  "home-page" : true,
  "results" : false, 
  "nav-bar2" : false,
  "otp-win" : false,
  "vote-win" : false
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
    "home-page" : false,
    "nav-bar2" : false,
    "otp-win" :false, 
    "vote-win" : false
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

const VoteWindowCallBack = () => {
  resetComponents();
  setComponents({
    "nav-bar":true, 
    "vote-win" : true,
    "footer" : true
  })
}

const OTPWinCallBack = () => {
  resetComponents();
  setComponents({
    "otp-win":true,  
    "nav-bar" : true,
    "footer" : true}
  );
}

const SwitchElectionStatus = () => {
  setElectionStatus(!electionStatus);
}

  return (
    <div>
      {components["nav-bar"] && <Navbar
      callback_results={ResultsCallBack}
      />}

      {/* {components["nav-bar2"] && <Navbar3 
      // callback_switchElection={SwitchElectionStatus} 
      // electionStatus={electionStatus}
      />} */}

      {/*components["otp-win"]&& <OTPWin/>*/}

      {
        <div className="App">
          {/* FIREBASE */}
          <div style={{color: `#000`, fontSize:`18px`, background: `rgba(255,255,255,0.75)`}}>
            Firebase database status : {dbStatus}<br/>
            Value : {dbValue}
          </div>
            
        </div>
      }
      {components["footer"] && <Footer/>}
      {components["admin-login"] && <AdminLogin callback_voter_reg={VoterRegCallBack}/>}
      {components["admin-reg"] && <Adminreg/>}
      {components["candidate-reg"] && false}
      {components["home-page"] && <Homepage
                                    callback_eci={ECIcallback} 
                                    callback_admin_log={AdminLogCallback}
                                    callback_voter_log={VoterRegCallBack}
                                    callback_vote_win={VoteWindowCallBack}
                                    callback_otp_win={OTPWinCallBack}
                                    Web3States={Web3States}
                                    />}
      {components["results"] && <Results/>}
      {components["voter-reg"] && <VoterReg Web3States={Web3States}
                                            callback_voter_log={VoterRegCallBack}
                                            callback_vote_win={VoteWindowCallBack}
                                            />}
      {components["eci-login"] && <EciLogin Web3States={Web3States}/>}
      {components["vote-win"] && <Votewindow/>}
      {components["otp-win"] && <OTPWin/>}
    </div>

  )
}

export default App;
