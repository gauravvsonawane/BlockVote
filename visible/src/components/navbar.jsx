import React from 'react'
import logo from '../resources/blockchain.png'

const Navbar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          
          <a className="navbar-brand navbar-text" href="/">
              <img src={logo} width="32" height="32" className="d-inline-block align-top mx-3" alt="logo"/>
              BlockVote
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            
            <button type="button" className="btn btn-outline-light mx-1" onClick={props.callback_eci}>ECI Login</button>
            <button type="button" className="btn btn-outline-light mx-1" onClick={props.callback_admin_log}>Admin Login</button>
            <button type="button" className="btn btn-outline-light mx-1" onClick={props.callback_results}>Results</button>
            
          </div>
        </div>
      </nav>  
    );
}

export default Navbar;
