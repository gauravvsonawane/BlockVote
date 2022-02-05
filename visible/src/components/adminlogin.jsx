const adminlogin = () => {
    return (
        <form className='ad_log_container'>

            <div className='ad_log_text'>Administrator Login</div>
            
            <div className='ad_log_input-box'>
            <input class="form-control me-2"placeholder='Enter Username' id='admin_username'/>
            </div>
            <div className='ad_log_input-box'>
            <input class="form-control me-2" placeholder='Enter Password' id='admin_password' type='password'/>
            </div>
            <div>
                 <button className='btn btn btn-dark' id='admin_log_in' formAction>LOG IN</button>
                 </div>
        </form>
    )
}

export default adminlogin