import React from 'react';

const VoterReg = () => {

    return (
        <div>
            <div className="voter-reg-box">
                <div className="voter-reg-title-box">
                    <h2 className="voter-reg-title">Voter Registration</h2>
                </div>
                <form>
                    <div class="mb-3">
                        <input type="text" class="form-control try" id="vr-name" placeholder="Name"/>
                    </div>
                    <div class="mb-3">
                        <input type="number" class="form-control" id="vr-password" placeholder="Enter Mobile Number"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" id="vr-address" placeholder="Enter Address"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" id="vr-aadhar" placeholder="Enter Aadhar Number" />
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" id="vr-aadhar" placeholder="Enter Voter Id Number" />
                    </div>


                    <div class="btn-mid">
                        <button type="submit" class="btn btn-dark mx-2 mt-3">Submit</button>
                    </div>
                </form> 
                 
            </div>   
        </div>
    );
}

export default VoterReg;