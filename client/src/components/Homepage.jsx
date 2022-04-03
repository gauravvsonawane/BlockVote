import React from 'react';
import '../css/Homepage.css';

const Homepage = (props) => {

    const ECILogin_click = async (e) => {
        e.preventDefault();
        const authenticated = await props.Web3States.contractInst.methods.authenticateECI(props.Web3States.accounts[0]).call();
        if(authenticated){
            props.callback_eci();
        }
        else {
            alert("User isn't authenticated ECI official! Please try switching accounts.");
        }
    }

    const VoterLogin_click = async(e) => {
        e.preventDefault();
        const authenticated = await props.Web3States.contractInst.methods.authenticateVoter(props.Web3States.accounts[0]).call();
        if(authenticated) {
            props.callback_vote_win();
        }
        else {
            props.callback_voter_log();
        }
    }

    const AdminLogin_click = async(e) => {
        e.preventDefault();
        const authenticated = await props.Web3States.contractInst.methods.authenticateAdmin(props.Web3States.accounts[0]).call();
        if(authenticated) {
            props.callback_ad_voter_reg();
            // props.callback_otp_win();
            // props.callback_voterid_win();
        }
        else {
            alert("User isn't registered, please ask ECI official to register you!");
            props.callback_ad_voter_reg();
        }
    }
    return (
        <div>
            <div className="home-info">
                <h2 className="d-flex justify-content-center fw-bold mt-3">Welcome to BlockVote!</h2>
                <p className="d-flex fw-bold my-3 mx-3" style={{textAlign:"justify"}}>BlockVote is a secure, modern, online medium to cast your vote. You can  vote from
                    the comfort of your home with a very few clicks and you can do your duty to your country!
                    Become a part of the revolution being sparked by cutting-edge Blockchain technology.  
                    In case you find any difficulty in the process, you can always visit your nearest 
                    administration center and complete the same process securely. As long as you  are a 
                    legitimate voter and citizen of India, you can cast your vote from literally
                    anywhere around the Globe!
                </p>

                <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-dark mx-4 my-4" onClick={ECILogin_click}>ECI Login</button>
                <button type="button" className="btn btn-dark mx-4 my-4" onClick={VoterLogin_click}>Voter Login</button>
                <button type="button" className="btn btn-dark mx-4 my-4" onClick={AdminLogin_click}>Admin Login</button>
            </div>
            </div>
        </div>
    );
}

export default Homepage;
