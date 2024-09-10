import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../context/DataContext';

import "./style.css"

function CardEvent(props) {

    const { item, tipo } = props;
    const navigate = useNavigate();
    // função de busca e armazenamendo de dados da API
    const { userData, setUserData } = useContext(DataContext);

    const handleSubmit = (evento) => {
        setUserData({
            evento: evento,
            dados: userData.dados,
            pagamento: userData.pagamento
        })
        navigate('/inscricao');
    }

    // convertendo data array USA para data brasileira
    function formatDate(dateArray) {
        if (!Array.isArray(dateArray) || dateArray.length !== 3) {
            return 'Data não definida';
        }

        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    function formatDateInscription(dateOne, dateTwo) {
        if ((!Array.isArray(dateOne) || dateOne.length !== 3) &&
            (!Array.isArray(dateTwo) || dateTwo.length !== 3)) {
            return 'Datas não definida';
        }

        const [yearOne, monthOne, dayOne] = dateOne;
        const [yearTwo, monthTwo, dayTwo] = dateTwo;

        return `Inscrições: ${dayOne}/${monthOne}/${yearOne} até ${dayTwo}/${monthTwo}/${yearTwo}`;
    };



    return (
        <Box
            sx={{
                width: "286px",
                height: "400px",
                backgroundColor: "#f2f2f2",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0px 0px 10px 0px",
                gap: "10px",
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    height: "50%",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <Box
                    sx={{
                        width: tipo === "LIST" ? '55%' : "65%", // Para ocupar toda a largura disponível
                        height: "100%", // Ajusta a altura automaticamente com base na largura
                        backgroundImage: `url(${item.linkImgLogo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover', // Mantém a proporção do QR Code
                        backgroundPosition: 'center',
                        borderRadius: "10px",
                    }}
                />
            </Box>

            <Typography variant="body1" className="eventname">
                <Box component="span" sx={{ fontWeight: 'bold' }} >
                    {item.name}
                </Box>
            </Typography>

            <Typography
                variant="body2"
                className="description"
                sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Limita o texto a 3 linhas
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                }}
            >
                {item.description}
            </Typography>

            <Typography variant="body2" className="data"> Início evento: {formatDate(item.dateEvent)}</Typography>

            <Typography variant="body2" className="inicio">
                {formatDateInscription(item.startRegistration, item.endRegistration)}
            </Typography>
            <Box className="startend">

                <Typography variant="body2" className="valor">
                    Valor Inscrição:
                </Typography>
                <Box component="span" sx={{ fontWeight: 'bold' }} >
                    R$ {item.value}
                </Box>
            </Box>

            {tipo === "LIST" &&
                <Button
                    variant="contained"
                    className="enviar"
                    sx={{
                        marginBottom: '10px',
                        marginTop: '10px'
                    }}
                    onClick={() => handleSubmit(item)}
                    type="submit"
                >
                    Inscrever-se
                </Button>
            }
        </Box>
    );
}

export default CardEvent;