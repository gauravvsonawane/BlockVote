import React from 'react'
import '../css/EciLogin.css';

const ecilogin = (props) => {
    return (
        <form className='eci_log_container'>

            <div className='eci_log_text'>ECI Login</div>
            
            <div className='eci_log_input-box'>
            <input className="form-control me-2"placeholder='Enter Username' id='eci_username'/>
            </div>
            <div className='eci_log_input-box'>
            <input className="form-control me-2" placeholder='Enter Password' id='eci_password' type='password'/>
            </div>
            <div className="btn-mid">
                 <button className='btn btn btn-dark' id='eci_log_in' formAction onClick={props.callback_admin_reg}>LOG IN</button>
            </div>
        </form>
    )
}

export default ecilogin
