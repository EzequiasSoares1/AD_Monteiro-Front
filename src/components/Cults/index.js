import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

import "./style.css"


function Cults() {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh',
                width: '100%',
                background: 'linear-gradient(180deg, rgba(30, 55, 194, 1), rgba(255,255,255,1))',
                padding: '20px',
            }}
        >

            <Typography sx={{ color: "white", }} variant="h4" gutterBottom>
                Ainda não sabe onde estamos localizados?
            </Typography>

            <Typography
                sx={{
                    color: "white",
                    marginBottom: '20px',

                }}
                variant="body1"
            >
                Ficamos na Av. Dep. Rafel Sebas, Nº 11 – Monteiro - PB
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className='localization'
                onClick={() => window.open('https://www.google.com.br/maps/place/IGREJA+ASSEMBL%C3%89IA+DE+DEUS/@-7.8942835,-37.1291337,20.62z/data=!4m6!3m5!1s0x7a887d71a6b3ae3:0xd54ddd620c7f1730!8m2!3d-7.894211!4d-37.1291309!16s%2Fg%2F11dxq27knf?entry=ttu&g_ep=EgoyMDI0MDkyMi4wIKXMDSoASAFQAw%3D%3D')}
            >
                Acessar Localização
            </Button>
        </Box>
    );
}

export default Cults;