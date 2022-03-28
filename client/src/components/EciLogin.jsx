import React from "react";
import {useState} from "react";
import '../css/EciLogin.css';
import BlockVoteContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";

const Ecilogin = (props) => {

    const [AdminName, setAdminName] = useState('');
    const [AdminMobileNo, setAdminMobileNo] = useState('');
    const [AdminEthKey, setAdminEthKey] = useState('');

    const changeAdminName = (e) => {
        setAdminName(e.target.value);
    }
    const changeAdminMobileNo = (e) => {
        setAdminMobileNo(e.target.value);
    }
    const changeAdminEthKey = (e) => {
        setAdminEthKey(e.target.value);
    }

    const addAdminClick = (e) => {
        e.preventDefault();

        if(AdminName.length != 0){
            if(AdminMobileNo.length == 10){
                if(AdminEthKey.length == 42){
                    addAdmin(AdminName, AdminMobileNo, AdminEthKey);
                    //window.location.reload();
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

    async function addAdmin(adName, adMoNo, adEthKey) {
        console.log(adName+adMoNo+adEthKey);
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
