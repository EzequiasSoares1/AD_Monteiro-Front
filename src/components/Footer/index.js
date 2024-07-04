import React from "react";
import { Box, Typography } from "@mui/material";

import Logo from "../../assets/logo.png"

import "./style.css"


function Footer() {
    return (
        <Box className="footer">
            <Box className="footer-contain">
                <Box className="sec-one">
                    <Box className="logo-contain">
                        <img className="logo" src={Logo} />
                    </Box>
                    <Box className="name-contain">
                        <Typography variant="body2">AD Monteiro</Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};

export default Footer;