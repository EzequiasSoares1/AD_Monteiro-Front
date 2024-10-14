import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


import "./style.css"


function Footer() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                minHeight: "100px",
                backgroundColor: "#b3b3b3",
            }}
        >
            <Stack direction="row" spacing={0} sx={{ marginBottom: "10px" }}>

                <IconButton
                    sx={{ color: "#f1f1f1" }}
                    aria-label="Instagram"
                    onClick={() => window.open('https://www.instagram.com/admonteiropb/', '_blank')}
                >
                    <InstagramIcon />
                </IconButton>

                <IconButton
                    sx={{ color: "#f1f1f1" }}
                    aria-label="YouTube"
                    onClick={() => window.open('youtube.com/channel/UCA9yNislQyOs2msCJWmgYFQ', '_blank')}
                >
                    <YouTubeIcon />
                </IconButton>

                <IconButton
                    sx={{ color: "#f1f1f1" }}
                    aria-label="Facebook"
                    onClick={() => window.open('https://www.facebook.com/admonteiropb/', '_blank')}
                >
                    <FacebookIcon />
                </IconButton>


            </Stack>
            <Typography
                sx={{
                    color: "#f1f1f1",
                    marginBottom: "10px"
                }}
                variant="body2"
            >
                IGREJA EVANGELICA ASSEMBLEIA DE DEUS EM MONTEIRO – PB
            </Typography>

        </Box>
    );
};

export default Footer;