import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import BannerSection from "../../components/BannerSection";
import NossaHistoria from "../../components/NossaHistoria";
import Cults from "../../components/Cults";
import "./style.css"


function Home() {

    return (
        <div className="app_home">
            <Header />
            <div id="inicio">
                <BannerSection />
            </div>
            <div id="nossahistoria">
                <NossaHistoria />
            </div>
            <div id="cultos">
                <Cults />
            </div>
            <div id="doacoes">
                {/*aqui vem as doações*/}
            </div>
            <Footer />
        </div>
    );
};


export default Home;