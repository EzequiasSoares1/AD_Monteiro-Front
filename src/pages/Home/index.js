import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import BannerSection from "../../components/BannerSection";
import NossaHistoria from "../../components/NossaHistoria";
import "./style.css"


function Home() {

    return (
        <div className="app_home">
            <Header className="header" />
            <div id="inicio">
                <BannerSection />
            </div>
            <div id="nossahistoria">
                <NossaHistoria />
            </div>
            <Footer />
        </div>
    );
};


export default Home;