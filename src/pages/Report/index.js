import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreContext from "../../store/StoreContext";
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
    Alert,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress
} from '@mui/material';
import { DataContext } from '../../context/DataContext';
import Api from '../../services/Api';
import Header from "../../components/Header";
import "./style.css"

function Report() {
    const { token } = useContext(StoreContext);
    const { userData } = useContext(DataContext);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [mensagemSnackBar, setMensagemSnackBar] = useState(null);
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Novo estado para controlar o carregamento

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
            Api.getReport(userData.evento.name, token)
                .then((response) => {
                    setReport(response.data);
                })
                .catch((error) => {
                    handleClickSnackBar(error.response.data)
                })
                .finally(() => {
                    setIsLoading(false); // Define o carregamento como falso após a API retornar
                });
        } else {
            handleClickSnackBar("Nenhum evento escolhido")
            setIsLoading(false); // Se nenhum evento foi escolhido, paramos o carregamento
        }
    }, [userData, token]);

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
            {isLoading ? ( // Mostra o indicador de carregamento enquanto os dados estão sendo buscados
                <CircularProgress />
            ) : (
                <>
                    {userData.evento === null && report && (
                        <Alert severity="success">
                            Retorne a lista de eventos e escolha um evento!
                        </Alert>
                    )}

                    {userData.evento !== null && report && ( // Verifica se o report foi carregado antes de renderizar
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
                </>
            )}
        </Box>
    );
}

export default Report;
