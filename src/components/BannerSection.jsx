import React from "react";
import "../styles/BannerSection.css"
import Logo from "../assets/logo.png"
import Banner from "../assets/banner.png"
import { ArrowBack, ArrowForward } from "@mui/icons-material";



const BannerSection = () => {
    return(
        <div className="banner-section">
            <div className="banner-section-contain">
                <div className="arrows">
                    <ArrowBack className="arrow"/>
                </div>
                <div className="arrows">
                    <ArrowForward className="arrow"/>
                </div>

            </div>
            
        </div>
    );
};

export default BannerSection;