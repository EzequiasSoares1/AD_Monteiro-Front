import { React, useState, useEffect } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import "./style.css"

import Image1 from '../../assets/imagem-1.jpg';
import Image2 from '../../assets/imagem-2.jpg';
import Image3 from '../../assets/imagem-3.jpg';
import Image4 from '../../assets/imagem-4.jpg';
import Image6 from '../../assets/imagem-6.jpg';
import Image7 from '../../assets/imagem-7.jpg';
import Image8 from '../../assets/imagem-8.jpg';

const slides = [
    { imageUrl: Image1 },
    { imageUrl: Image2 },
    { imageUrl: Image3 },
    { imageUrl: Image4 },
    { imageUrl: Image6 },
    { imageUrl: Image7 },
    { imageUrl: Image8 },
];

function BannerSection({ interval = 5000 }) {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, interval);

        return () => clearInterval(slideInterval);
    }, [slides.length, interval]);

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%',
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        width: '100%',
                        px: 2,  // padding horizontal para evitar que o texto encoste nas bordas em telas menores
                        fontSize: { xs: '6vw', sm: '4vw', md: '3vw', lg: '2.5vw' }, // Tamanhos de fonte responsivos
                        zIndex: 2,
                        fontFamily: "'Cinzel', serif"
                    }}
                >
                    "União, Comunhão e Oração"
                </Typography>
                <Typography
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        top: '55%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        width: '100%',
                        px: 2,  // padding horizontal para evitar que o texto encoste nas bordas em telas menores
                        fontSize: { xs: '5vw', sm: '3vw', md: '2vw', lg: '1.5vw' }, // Tamanhos de fonte responsivos
                        zIndex: 2,
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    --- ESSE É O NOSSO LEMA ---
                </Typography>
                <Box
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        top: '90%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        px: 2,  // padding horizontal para evitar que o texto encoste nas bordas em telas menores
                        fontSize: { xs: '5vw', sm: '3vw', md: '2vw', lg: '1.5vw' }, // Tamanhos de fonte responsivos
                        zIndex: 2,
                        border: '1px solid white',  // Adiciona a borda de 2px de largura com cor branca
                        borderRadius: '8px',  // Adiciona um leve arredondamento à borda
                        animation: 'float 4s ease-in-out infinite',  // Adiciona a animação ao Box
                        '@keyframes float': {
                            '0%, 100%': {
                                transform: 'translate(-50%, -50%) translateY(0)',
                            },
                            '50%': {
                                transform: 'translate(-50%, -50%) translateY(-10px)',  // Subir 10px no meio da animação
                            },
                        },
                    }}
                >
                    <Typography variant="body1">
                        Nossa História <ArrowDownwardIcon sx={{ ml: 1, fontSize: 'inherit', verticalAlign: 'text-bottom' }} />
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${currentSlide * 100}%)`,
                        height: '100%',
                    }}
                >
                    {slides.map((slide, index) => (
                        <Box
                            key={index}
                            sx={{
                                minWidth: '100%',
                                height: '100%',
                                backgroundImage: `
                                    linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(30, 55, 194, 1)),
                                    url(${slide.imageUrl})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    ))}
                </Box>
            </Grid>
        </Grid>
    );

};

export default BannerSection;