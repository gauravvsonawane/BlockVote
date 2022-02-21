import React from 'react';
import '../css/VoterReg.css';

const VoterReg = () => {

    return (
        <div>
            <div className="voter-reg-box">
                <div className="voter-reg-title-box">
                    <h2 className="voter-reg-title">Voter Registration</h2>
                </div>
                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control try" id="vr-name" placeholder="Name"/>
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control" id="vr-mobilenum" placeholder="Enter Mobile Number"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="vr-address" placeholder="Enter Address"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="vr-aadhar" placeholder="Enter Aadhar Number" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="vr-voterid" placeholder="Enter Voter Id Number" />
                    </div>


                    <div className="btn-mid">
                        <button type="submit" className="btn btn-dark mx-2 mt-3">Submit</button>
                    </div>
                </form> 
                 
            </div>   
        </div>
    );
}

export default VoterReg;