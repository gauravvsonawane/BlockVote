import React from 'react';
import '../css/Homepage.css';

const OTPWin = (props) => {

    return (
        <div>
            <div className="home-info">
            <h4 className="d-flex justify-content-center fw-bold">
                You have been sent an OTP on your registered mobile number. Please enter it!
            </h4>
            <div className="mb-3" >
                <input type="text" className="form-control" id="otp" placeholder="Enter OTP" />
            </div>
            
            </div>
            

        </div>
    );
}

export default OTPWin;
