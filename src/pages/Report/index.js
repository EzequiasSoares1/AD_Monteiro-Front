import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    Snackbar,
    Alert
} from '@mui/material';

import { DataContext } from '../../context/DataContext';
import Api from '../../services/Api';
import Header from "../../components/Header";
import "./style.css"

const defaultTheme = createTheme();

function Report() {

    const { userData, setUserData } = useContext(DataContext);

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [mensagemSnackBar, setMensagemSnackBar] = useState(null);

    const [report, setReport] = useState(null);

    const navigate = useNavigate();

    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem)
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    useEffect(() => {

        if (userData.evento !== null) {
            Api.getReport(userData.evento.name)
                .then((response) => {
                    setReport(response.data);
                })
                .catch((error) => {
                    handleClickSnackBar(error.response.data)
                });
        } else {
            handleClickSnackBar("Nenhum evento escolhido")
        }

    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: userData.evento === null ? "center" : "flex-start",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            {userData.evento === null && (
                <Alert severity="success">
                    Retorne a lista de eventos e escolha um evento!
                </Alert>
            )}

            {userData.evento !== null && (
                <Box>
                    <Header />
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                height: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Relatório Inscrição - {userData.evento.name}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Quantidade de Inscritos: {report.amountRegistered}
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Total Arrecadado: {report.totalCollection !== null ? `R$ ${report.totalCollection}` : "Não disponível"}
                            </Typography>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {report.registered.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Button
                                onClick={() => navigate("/eventos")}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: "50%" }}
                            >
                                Voltar
                            </Button>
                        </Box>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={openSnackBar}
                            autoHideDuration={5000}
                            onClose={handleCloseSnackBar}
                        >
                            <Alert severity="error">
                                {mensagemSnackBar}
                            </Alert>
                        </Snackbar>
                    </Container>
                </Box>
            )}

        </Box>
    );
}

export default Report;