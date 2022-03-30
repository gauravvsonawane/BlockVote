import React from "react";
import {useState, useEffect} from "react";
import '../css/EciLogin.css';
import BlockVote from "../contracts/BlockVote.json";
import getWeb3 from "../getWeb3";

const Ecilogin = (props) => {

    const [AdminName, setAdminName] = useState('');
    const [AdminMobileNo, setAdminMobileNo] = useState('');
    const [AdminEthKey, setAdminEthKey] = useState('');

    const [Web3States, setWeb3States] = useState({
        web3:null, accounts:null, contractInst:null
    });

    const changeAdminName = (e) => {
        setAdminName(e.target.value);
    }
    const changeAdminMobileNo = (e) => {
        setAdminMobileNo(e.target.value);
    }
    const changeAdminEthKey = (e) => {
        setAdminEthKey(e.target.value);
    }

    useEffect(() => {
        getAndSetWeb3();
      },[]);

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

    const addAdminClick = (e) => {
        e.preventDefault();

        if(AdminName.length != 0){
            if(AdminMobileNo.length == 10){
                if(AdminEthKey.length == 42){
                    addAdmin().then((success)=>{
                        if(success){
                            alert("Admin added to the blockchain!");
                            window.location.reload();
                        }
                        else
                            alert("Couldn't add admin to the blockchain.");
                    }); 
                }
                else{
                    alert("Invalid ETH wallet address : Please enter correct wallet address.");
                }
            }
            else{
                alert("Invalid Mobile number : Please enter correct mobile number.");
            }
        }
        else{
            alert("Enter administrator name!");
        }
    }

    const addAdmin = async() => {
        if(Web3States.web3!=null){
            try{
                await Web3States.contractInst.methods.addAdmin(Web3States.accounts[0],AdminName, AdminMobileNo, AdminEthKey)
                .send({ from: Web3States.accounts[0] });
            }
            catch(error){
                alert(error.message);
                return false;
            }
            const state = await Web3States.contractInst.methods.getAddAdminState().call();
            if(state == 2){
                alert("Admin with this wallet key already exist in the blockchain.");
                return false;
            }
            if(state == 3){
                alert("Invalid ECI credentials. This account don't have permission to add Admins in the blockchain.");
                return false;
            }
            return true;
        }
        alert("Web3 instance is null.");
        return false;
    }

    return (
        <form className='eci_log_container'>

            <div className='eci_log_heading_text'>Add a new Administrator</div>
            
            <div className="form-group row">
                <label className="eci_log_text col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                <input className="eci_log_input-box form-control"placeholder='Name of Administrator' onChange={changeAdminName}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="eci_log_text col-sm-3 col-form-label">Mobile number</label>
                <div className="col-sm-9">
                <input className="eci_log_input-box form-control"placeholder='Mobile Number' onChange={changeAdminMobileNo}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="eci_log_text col-sm-3 col-form-label">ETH wallet public key</label>
                <div className="col-sm-9">
                <input className="eci_log_input-box form-control"placeholder='0x0000000000000000000000000000000000000000' onChange={changeAdminEthKey}/>
                </div>
            </div>

            <div className="btn-mid">
                 <button className='btn btn btn-dark' id='add_admin' onClick={addAdminClick}>Add Administrator</button>
            </div>
        </form>
    )
}

export default Ecilogin
