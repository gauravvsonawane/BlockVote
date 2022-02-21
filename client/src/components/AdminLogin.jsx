import React from 'react';
import '../css/AdminLogin.css';

const adminlogin = (props) => {
    return (
        <form className='ad_log_container'>

            <div className='ad_log_text'>Administrator Login</div>
            
            <div className='ad_log_input-box'>
            <input className="form-control me-2"placeholder='Enter Username' id='admin_username'/>
            </div>
            <div className='ad_log_input-box'>
            <input className="form-control me-2" placeholder='Enter Password' id='admin_password' type='password'/>
            </div>
            <div className="btn-mid">
                 <button className='btn btn-dark' id='admin_log_in' formAction onClick={props.callback_voter_reg}>LOG IN</button>
            </div>
        </form>
    )
}

export default adminlogin;