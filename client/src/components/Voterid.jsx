import React, { useEffect } from 'react';
import '../css/VoterReg.css';
import { useState } from 'react';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Voterid = (props) => {

    const[voterid, setVoterid] = useState("");
    let _voterid = null;
    let mobile="";
    const [verification, setVerification] = useState(false);

    const setMobile = (val) => {
        mobile = val;
    }
    const setid = (e)=>{
        _voterid = e.target.value;
        setVoterid(_voterid);
    }

    const getMobileNumber = async(event)=>{
        event.preventDefault();
        if(voteridValidator()) {
            const _mobile = await props.Web3States.contractInst.methods.getVoterMobileNumber(voterid).call();
            setMobile(_mobile);
            alert(mobile);
        }
        
    }

    const setUpRecaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
        }
        }, auth);
    }
    const voteridValidator = () => {
        if(voterid.length!=10) {
            alert("Enter valid voter id!");
            return false;
        }
        return true;
    }

    const onSignInSubmit = (event) => {
        event.preventDefault();
        setUpRecaptcha();
        const phoneNumber = "+91" + mobile;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            const code = window.prompt("Enter OTP");
            confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log("User is signed in");
            setVerification(true);
            // ...
            }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            });
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            });
    }

    useEffect(async()=> {
        if(verification && voterid) {
            console.log(voterid);
            const phase = await props.Web3States.contractInst.methods.getElectionStatus().call();
            if(phase=="Voting") {
                props.callback_ad_vote_win(voterid);
            }
            else if(phase=="preVoting") {
                alert("Voting has not started yet!");
            }
        }
    },[verification, voterid])

    return (
        <div>
            <div className="voter-reg-box">
                <div className="voter-reg-title-box">
                    <h2 className="voter-reg-title">OTP Verfication</h2>
                </div>
                <form>
                    <div className="mb-3 input-margin">
                        <input onChange={setid} type="text" className="form-control try" id="vr-name" placeholder="Voter id"/>
                    </div>
                   
                    


                    <div className="btn-mid">
                        <button type="submit" className="btn btn-dark mx-2 mt-3" onClick = {getMobileNumber}>Get Mobile Number</button>
                        <button type="submit" className="btn btn-dark mx-2 mt-3" onClick = {onSignInSubmit}>Verify</button>
                    </div>
                </form> 
                 
            </div>  
            <div id="recaptcha-container"></div>  
        </div>
    );
}

export default Voterid;