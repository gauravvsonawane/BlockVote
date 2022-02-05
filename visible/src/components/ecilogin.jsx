import React from 'react'

const ecilogin = () => {
    return (
        <form className='eci_log_container'>

            <div className='eci_log_text'>ECI Login</div>
            
            <div className='eci_log_input-box'>
            <input class="form-control me-2"placeholder='Enter Username' id='eci_username'/>
            </div>
            <div className='eci_log_input-box'>
            <input class="form-control me-2" placeholder='Enter Password' id='eci_password' type='password'/>
            </div>
            <div>
                 <button className='btn btn btn-dark' id='eci_log_in' formAction>LOG IN</button>
                 </div>
        </form>
    )
}

export default ecilogin
