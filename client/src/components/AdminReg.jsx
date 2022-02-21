import React from "react"
import '../css/AdminReg.css';

const Adminreg = () => {

    return (
        <div>
            <div className="admin-reg-box">
                <div className="admin-reg-title-box">
                    <h2 className="admin-reg-title">Admin Registration</h2>
                </div>
                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control try" id="ar-name" placeholder="Name"/>
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control" id="ar-mobile" placeholder="Enter Mobile Number"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="ar-address" placeholder="Enter Address"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="ar-aadhar" placeholder="Enter Aadhar Number" />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="ar-email" placeholder="Enter Email Id" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="ar-password" placeholder="Enter Password" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="ar-confirmpassword" placeholder="Confirm Password" />
                    </div>


                    <div className="btn-mid">
                        <button type="submit" className="btn btn-dark mx-2 mt-3">Register</button>
                    </div>
                </form> 
                 
            </div>   
        </div>
    );

}

export default Adminreg;