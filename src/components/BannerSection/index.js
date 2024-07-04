import React from "react";
import { Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import "./style.css"

function BannerSection() {
    return (
        <Box className="banner-section">
            <Box className="banner-section-contain">
                <Box className="arrows">
                    <ArrowBack className="arrow" />
                </Box>
                <Box className="arrows">
                    <ArrowForward className="arrow" />
                </Box>

            </Box>

        </Box>
    );
};

export default BannerSection;