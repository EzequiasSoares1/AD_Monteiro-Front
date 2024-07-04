import React from "react";
import { Box, Typography } from "@mui/material";

import Line from "../../assets/line.svg"
import CardNs from "../../assets/card-ns.png"

import "./style.css"

function NossaHistoria() {
    return (
        <Box className="ns-section">
            <Box className="ns-max-w">
                <Box className="ns-title">
                    <Typography variant="h1">Nossa História</Typography>
                </Box>
                <Box className="ns-contain">

                    <Box className="image">
                        <img className="img-one" src={CardNs} alt="" />
                    </Box>

                    <Box className="text">
                        <Typography variant="h1">Texto Impactante</Typography>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam facere porro repellendus deleniti error, voluptate repellat quae itaque sint optio, quis alias exercitationem ipsam enim illum ad. Explicabo, repudiandae ut.
                        </Typography>
                    </Box>
                </Box>
                <Box className="ns-line">
                    <img src={Line} alt="" />
                </Box>
            </Box>
        </Box>
    );
};

export default NossaHistoria;