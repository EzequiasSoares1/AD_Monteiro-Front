import React from "react";
import Logo from "../assets/logo.png"
import Style from "../styles/Footer.css"


const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-contain">
                <div className="sec-one">
                    <div className="logo-contain"> 
                        <img  className="logo" src={Logo} />
                    </div>
                    <div className="name-contain">
                        <p>AD Monteiro</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Footer;