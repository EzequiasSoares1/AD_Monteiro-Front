import React from "react";
import AppRouter from '../router/AppRouter'
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import BannerSection from "../components/BannerSection";
import NossaHistoria from "../components/NossaHistoria";
import "../styles/Home.css"


const Home = () => {

    return(
        <div className="AppHome">
            <Header className="header"/>
            <BannerSection/>
            <NossaHistoria/>
            <Footer/>
        </div>
    );
};


export default Home;