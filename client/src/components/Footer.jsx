import React from "react";
import '../css/Footer.css';

const Footer = () => {

    return (
        <div>
            <footer id="sticky-footer" className="flex-shrink-0 py-2 bg-dark text-white-50 ftr" >
                <div className="container text-center">
                    <strong>&copy;</strong> BlockVote 2022
                </div>
            </footer>
        </div>
    );
}

export default Footer;