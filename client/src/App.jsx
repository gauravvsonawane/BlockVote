import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import "./App.css";

import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Footer from './components/Footer'
import VoterReg from './components/VoterReg'
import EciLogin from './components/EciLogin'
import AdminLogin from './components/AdminLogin'
import Adminreg from './components/AdminReg'
import Results from './components/Results'
import { getDatabase, ref, child, get } from "firebase/database";

const App = () => {

  const [value, setValue] = useState(0);
  const [web3, setWeb3] = useState();
  const [acc, setAcc] = useState();
  const [contract, setContract] = useState();

  const [dbStatus, setDBStatus] = useState("Connecting to Firebase...");
  const [dbValue, setDBValue] = useState("");
  
  async function connectWeb3(){
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // setWeb3(web3);
  
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // setAcc(accounts);
  
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      transact(instance, accounts);
  
    } catch(error){
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  async function transact(instance, accounts){
    await instance.methods.set(5).send({ from: accounts[0] });

    const response = await instance.methods.get().call();
    setValue(response)
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
    connectWeb3();
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

      {
        <div className="App">

          {/* TRUFFLE */}
          <div  style={{color: `#000`, fontSize:`18px`, background: `rgba(255,255,255,0.75)`}} >
            If the value is 5, App is connected to truffle. <br/>
            <strong>Value = {value} </strong>
          </div>
          <br/>

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
      {components["voter-reg"] && <VoterReg />}
      {components["eci-login"] && <EciLogin callback_admin_reg={AdminRegCallBack}/>}
      {components["home-page"] && <Homepage/>}
      {components["results"] && <Results/>}
    </div>
  )
}

export default App;
