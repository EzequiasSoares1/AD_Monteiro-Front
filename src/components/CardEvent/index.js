import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';


import { DataContext } from '../../context/DataContext';
import StoreContext from "../../store/StoreContext";

import "./style.css"

function CardEvent(props) {

    const { item, tipo } = props;
    const navigate = useNavigate();
    const { token } = useContext(StoreContext);

    // função de busca e armazenamendo de dados da API
    const { userData, setUserData } = useContext(DataContext);

    const handleSubmit = (evento) => {
      
        setUserData({
            evento: evento,
            dados: userData.dados,
            pagamento: userData.pagamento
        })
        localStorage.removeItem("mykey");
        
        if (token === null) {
            navigate('/inscricao');
        } else {
            localStorage.setItem("evento", JSON.stringify(evento));
            navigate('/relatorio');
        }
    }

    function formatDateWithLeadingZeros(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    return (
        <Box
            sx={{
                width: "286px",
                height: "450px",
                backgroundColor: "#f2f2f2",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 10px 10px 10px",
                gap: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
                        width: tipo === "LIST" ? '55%' : "65%",
                        height: "100%",
                        backgroundImage: `url(${item.linkImgLogo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: "10px",
                    }}
                />
            </Box>

            <Typography variant="body1" className="eventname" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {item.name}
            </Typography>

            <Typography variant="body2" className="eventDescription" sx={{ textAlign: 'center', color: 'text.secondary', fontStyle: 'Arial' }}>
                {item.description}  
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1px' }}>
            
            <Typography 
                variant="body2" 
                className="data" 
                sx={{ 
                    fontWeight: 600,  // Título mais destacado com peso mais forte
                    color: 'text.primary',  // Cor principal para o título
                    marginRight: '2px'  // Reduzindo ainda mais o espaço entre título e informação
                }}
            >
                Início do evento:
            </Typography>
            <Typography 
                variant="body2" 
                className="dataValue" 
                sx={{ 
                    fontWeight: 400,  // Informação com peso mais leve
                    color: 'text.secondary',  // Cor secundária para o texto normal
                }}
            >
                {formatDateWithLeadingZeros(item.dateEvent)} 
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1px' }}>
            <Typography 
                variant="body2" 
                className="city" 
                sx={{ 
                    fontWeight: 600,  // Destacando o título
                    color: 'text.primary',  // Título em cor primária
                    marginRight: '2px'  // Reduzindo o espaço entre título e informação
                }}
            >
                Local:
            </Typography>
            <Typography 
                variant="body2" 
                className="cityValue" 
                sx={{ 
                    fontWeight: 400,  // Texto normal com peso leve
                    color: 'text.secondary',  // Cor secundária para o texto normal
                }}
            >
                {item.city}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1px' }}>
            <Typography 
                variant="body2" 
                className="inicio" 
                sx={{ 
                    fontWeight: 600,  // Destacando o título
                    color: 'text.primary',  // Título em cor primária
                    marginRight: '2px'  // Reduzindo o espaço entre título e informação
                }}
            >
                Fim das Inscrições:
            </Typography>
            <Typography 
                variant="body2" 
                className="inicioValue" 
                sx={{ 
                    fontWeight: 400,  // Informação normal com peso leve
                    color: 'text.secondary',  // Cor secundária para o texto normal
                }}
            >
                {formatDateWithLeadingZeros(item.endRegistration)}
            </Typography>
        </Box>

        <Box 
            className="startend" 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',  // Coloca os elementos nas extremidades
                alignItems: 'center', 
                marginBottom: '1px' // Reduzindo o espaço final entre os elementos
            }}
        >
            <Typography 
                variant="body2" 
                className="valor" 
                sx={{ 
                    fontWeight: 600,  // Destacando o título
                    color: 'text.primary', // Cor principal para o título
                    marginRight: '2px'  // Reduzindo o espaço entre título e informação
                }}
            >
                Valor da Inscrição:
            </Typography>
            <Box 
                component="span" 
                sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main', // Usando a cor principal do tema para destacar o valor
                }}
            >
                 {item.value} R$
            </Box>
        </Box>



            {tipo === "LIST" && (
                <Button
                    endIcon={token ? <DescriptionIcon /> : null}
                    variant="contained"
                    className="enviar"
                    sx={{
                        marginBottom: '10px',
                        marginTop: '10px',
                        paddingX: '20px',
                        backgroundColor: 'primary.main',
                        '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                    onClick={() => handleSubmit(item)}
                >
                    {token ? "Relatório" : "Inscreva-se"}
                </Button>
            )}
        </Box>
    );
}


export default CardEvent;