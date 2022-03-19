import React from 'react';
import '../css/Homepage.css';

const HomePage = (props) => {

    return (
        <div>
            <div className="home-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium distinctio modi quos ut illo illum eius, eum cupiditate, hic, velit deserunt! Aperiam optio adipisci molestias temporibus aliquam. Alias, quas quasi nulla illum possimus nemo consequatur nihil odio doloribus quisquam ab.
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
