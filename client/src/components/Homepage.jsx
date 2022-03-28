import React from 'react';
import '../css/Homepage.css';

const HomePage = (props) => {

    return (
        <div>
            <div className="home-info">
            <h2 className="d-flex justify-content-center fw-bold mt-3">Welcome to BlockVote!</h2>
            <p className="d-flex fw-bold my-3 mx-5" style={{textAlign:"justify"}}>&emsp; BlockVote is a safe, secure, modern, online medium to cast your vote. You can  vote from
                the comfort of your home with a very few clicks and you can do your duty to your country!
                Become a part of the revolution being sparked by cutting-edge Blockchain technology.  
                In case you find any difficulty in the process, you can always visit your nearest 
                administration center and complete the same process securely. As long as you  are a 
                legitimate voter and citizen of India, you can cast your vote from literally
                anywhere around the Globe!</p>
            <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-dark mx-4 my-4" onClick={props.callback_eci}>ECI Login</button>
            <button type="button" className="btn btn-dark mx-4 my-4" onClick={props.callback_voter_log}>Voter Login</button>
            <button type="button" className="btn btn-dark mx-4 my-4" onClick={props.callback_admin_log}>Admin Login</button>
            </div>
            
            </div>
            

        </div>
    );
}

export default HomePage;
