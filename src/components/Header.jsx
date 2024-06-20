import React from "react";
import Style  from "../styles/Header.css"
import { Avatar, Menu, MenuItem, MenuList } from "@mui/material";
import { Home, MenuBook} from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png"


const Header = () => {
    return(
        <div className="header" >
            <div  className="max-width-header">

            <div className="header-contain-max">
                <div className="logo-contain">
                    <img className="logo" src={Logo}/>
                
                </div>
                <div className="nav-contain">
                    <nav>
                        <a>{<NavLink to="/inicio"> Início</NavLink>}</a>
                        <a>Nossa História</a>
                        <a>Cultos</a>
                        <a>Doações</a>
                        <a><NavLink to="/eventos">Eventos</NavLink></a> 
                    </nav>  
                </div>
                <div className="other-link">
                    <span>
                        <Avatar/>
                    </span>
                </div>
            </div>


            <div className="header-contain-media">
                <div className="menu-contain">
                    <MenuBook sx={{ color: "#262526" }}/>
                </div>
                <div className="logo-contain-media">
                    <img className="logo" src={Logo}/>
                </div>
                <div className="other-link">
                    <span>
                        <Avatar/>
                    </span>
                </div>
            </div>
            </div>
        </div>
        
    );
};

export default Header;