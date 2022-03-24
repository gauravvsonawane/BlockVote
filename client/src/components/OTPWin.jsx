import React from 'react';
import '../css/Homepage.css';
import '../css/OTPWin.css';

const OTPWin = (props) => {

    return (
        <div>
            <div className="home-info">
            <h4 className="d-flex justify-content-center fw-bold">
                You have been sent an OTP on your registered mobile number. Please enter it!
            </h4>
            <div className="mb-3 input-margin" >
                <input type="text" className="form-control" id="otp" placeholder="Enter OTP" /> 
            </div>
            <div className="d-flex justify-content-center my-3">
                <button className='btn btn-dark' id='otp_submit' onClick={props.callback_admin_reg}>Submit</button>
            </div>
            
            </div>
            

        </div>
    );
}

export default OTPWin;
