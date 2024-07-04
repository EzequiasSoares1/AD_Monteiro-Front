import { React, useState, useContext, useRef } from "react";
import { Box, Typography, TextField, CssBaseline, Alert, Button, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../context/DataContext';
import PaymentBrick from "../MercadoPago";

import axios from "axios";
import "./style.css"

function Payment() {

    const { userData, setUserData } = useContext(DataContext);
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [cidade, setCidade] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [sexo, setSexo] = useState("");
    const [tamanhoCamisa, setTamanhoCamisa] = useState("");

    const [value, setValue] = useState(0);
    const ref = useRef(null);

    const handleSubmit = () => {

        if (userData.dados !== null) {

            alert("Finalizando")
        }
    };

    function formatDate(dateArray) {
        if (!Array.isArray(dateArray) || dateArray.length !== 3) {
            return 'Data não definida';
        }

        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    const CardEvent = ({ item }) => (
        <Box className="cardevento">

            <Box className="imgcontainer">
                <img className="imagem" src={`data:image/jpeg;base64, ${item.linkImgLogo}`} alt="imagem do evento" />
            </Box>

            <Typography variant="body2" className="valor">R$ {item.value}</Typography>

            <Typography variant="h3" className="eventname">{item.name}</Typography>

            <Typography variant="body2" className="description">{item.description}</Typography>

            <Typography variant="body2" className="data">{formatDate(item.dateEvent)}</Typography>

            <Box className="startend">
                <Typography variant="body2" className="inicio">{formatDate(item.startRegistration)}</Typography>
                <Typography variant="body2">ATÉ</Typography>
                <Typography variant="body2" className="final">{formatDate(item.endRegistration)}</Typography>
            </Box>

            <Button
                variant="contained"
                className="enviar"
                sx={{
                    marginBottom: '10px',
                    marginTop: '10px'
                }}
                onClick={() => {
                    alert('confirmar');
                }}
                type="submit"
            >
                Confirmar Inscrição
            </Button>
        </Box>
    );

    return (

        <Box id="box_principal">
            {userData.dados === null && (
                <Alert severity="success">
                    Retorne à inscrição e insira seus dados pessoais!
                </Alert>
            )}
            {userData.dados !== null && (
                <Box id="box_centralizador">
                    <Box id="box_A" sx={{ marginBottom: "10px" }}>
                        <Typography variant="h5" sx={{ textAlign: "justify" }}>
                            Pagamento
                        </Typography>

                        <CardEvent item={userData.evento} />
                    </Box>
                    <Box id="box_B">
                        <Box sx={{ pb: 7 }} ref={ref}>
                            <CssBaseline />

                            <BottomNavigation
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            >
                                <BottomNavigationAction label="Cartão" />
                                <BottomNavigationAction label="Pix" />
                                <BottomNavigationAction label="Dinheiro" />
                            </BottomNavigation>

                            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                                <Box sx={{ pt: 2 }}>
                                    {value === 0 && (
                                        <PaymentBrick />
                                    )}
                                    {(value === 1 || value === 2) && (
                                        <Box>
                                            <TextField
                                                required
                                                id="txEmail"
                                                type="email"
                                                fullWidth
                                                variant="outlined"
                                                label="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            ></TextField>
                                            <TextField
                                                required
                                                id="txNome"
                                                fullWidth
                                                variant="outlined"
                                                label="Nome Completo"
                                                value={nome}
                                                sx={{ marginTop: "10px" }}
                                                onChange={(e) => setNome(e.target.value)}
                                            ></TextField>
                                        </Box>
                                    )}

                                </Box>
                            </form>

                        </Box>
                        {value !== 0 && (<Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: "20px",
                            width: "100%"
                        }}>
                            <Button
                                variant="contained"
                                className="enviar"
                                sx={{
                                    width: "30%",
                                    minWidth: "200px"
                                }}
                                onClick={() => handleSubmit()}
                            >
                                Finalizar
                            </Button>
                        </Box>)}
                    </Box>
                </Box >
            )}
        </Box >
    );

};

export default Payment;




