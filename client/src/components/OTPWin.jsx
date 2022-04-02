import React from 'react';
import useState from 'react';
import '../css/Homepage.css';
import '../css/OTPWin.css';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const OTPWin = (props) => {
    const[verfication, setVerfication] = useState(false);
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
        const phoneNumber = "+91" + props.mobile;
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
            setVerfication(true);
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
    
    return (
        <div>
            <h1>{props.mobile}</h1>
            <div className="home-info">
            <h4 className="d-flex justify-content-center fw-bold">
                You have been sent an OTP on your registered mobile number. Please enter it!
            </h4>
            <div id="recaptcha-container"></div>
            <div className="mb-3 input-margin" >
                <input type="text" className="form-control" id="otp" placeholder="Enter OTP" /> 
            </div>
            <div className="d-flex justify-content-center my-3">
                <button className='btn btn-dark' id='otp_submit' onClick={onSignInSubmit}>Submit</button>
            </div>
            
            </div>
            

        </div>
    );
}

export default OTPWin;
