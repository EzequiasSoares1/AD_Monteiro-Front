import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreContext from "../../store/StoreContext";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Snackbar,
    Alert,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress
} from '@mui/material';
import Api from '../../services/Api';
import Header from "../../components/Header";
import "./style.css";

function Report() {
    const { token } = useContext(StoreContext);
    const [userData, setUserData] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [mensagemSnackBar, setMensagemSnackBar] = useState(null);
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem);
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    useEffect(() => {
        const storedEvento = JSON.parse(localStorage.getItem("evento"));
        setUserData(storedEvento);

        if (storedEvento) {
            Api.getReport(storedEvento.name, token)
                .then((response) => {
                    setReport(response.data);
                })
                .catch((error) => {
                    handleClickSnackBar(error.response.data);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            handleClickSnackBar("Nenhum evento escolhido");
            setIsLoading(false);
        }
    }, [token]);

    const allData = report?.registered || [];
    const sortedAllData = allData.sort((a, b) => a.name.localeCompare(b.name));

    const filteredData = sortedAllData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const nonFilteredData = sortedAllData.filter(user =>
        !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !user.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const finalData = [...filteredData, ...nonFilteredData];

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: userData === null ? "center" : "flex-start",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {userData === null && report && (
                        <Alert severity="success">
                            Retorne a lista de eventos e escolha um evento!
                        </Alert>
                    )}

                    {userData !== null && report && (
                        <Box>
                            <Header />
                            <Container component="main" maxWidth="xs">
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        pt: 10,
                                    }}
                                >
                                    <Typography component="h1" variant="h5">
                                        Relatório Inscrição - {userData.name}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Quantidade de Inscritos: {report.amountRegistered}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 3 }}>
                                        Total Arrecadado: {report.totalCollection !== null ? `R$ ${parseFloat(report.totalCollection).toFixed(2)}` : "Não disponível"}
                                    </Typography>

                                    <TextField
                                        variant="outlined"
                                        placeholder="Buscar por nome ou cidade"
                                        fullWidth
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />

                                    <Table>
                                        <TableHead className="TableHead">
                                            <TableRow>
                                                <TableCell>Nome</TableCell>
                                                <TableCell>Cidade</TableCell>
                                                <TableCell>Tamanho Blusa</TableCell>
                                                <TableCell>Sexo</TableCell>
                                                <TableCell>Contato Pessoal</TableCell>
                                                <TableCell>Contato de Emergência</TableCell>
                                                <TableCell>Status do Pagamento</TableCell>
                                                <TableCell>Tipo de Pagamento</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {finalData.map((user, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ backgroundColor: index % 2 === 0 ? 'background.paper' : 'grey.100' }}
                                                >
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.city}</TableCell>
                                                    <TableCell>{user.shirtSize}</TableCell>
                                                    <TableCell>{user.sex}</TableCell>
                                                    <TableCell>{user.telephone}</TableCell>
                                                    <TableCell>{user.emergencyContact}</TableCell>
                                                    <TableCell>{user.paymentStatus}</TableCell>
                                                    <TableCell>{user.paymentType}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    <Button
                                        onClick={() => navigate("/eventos")
                                        }
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
