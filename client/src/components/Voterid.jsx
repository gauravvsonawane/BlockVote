import React, { useEffect } from 'react';
import '../css/VoterReg.css';
import { useState } from 'react';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Voterid = (props) => {

    let voterid = null;
    let mobile="";
    const [verification, setVerification] = useState(false);

    const setMobile = (val) => {
        mobile = val;
    }
    const setid = (e)=>{
        voterid = e.target.value;
    }

    const getMobileNumber = async(event)=>{
        event.preventDefault();
        const _mobile = await props.Web3States.contractInst.methods.getVoterMobileNumber(voterid).call();
        setMobile(_mobile);
        alert(mobile);
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

    useEffect(()=> {
        if(verification) {
           props.callback_vote_win();
        }
    },[verification])

    return (
        <div>
            <div className="voter-reg-box">
                <div className="voter-reg-title-box">
                    <h2 className="voter-reg-title">Vote</h2>
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