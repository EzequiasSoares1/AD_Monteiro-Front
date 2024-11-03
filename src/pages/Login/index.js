import React, { useState, useContext } from 'react';
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
    Alert
} from '@mui/material';

import Logo from "../../assets/logo.png";
import Api from "../../services/Api";
import "./style.css"

const defaultTheme = createTheme();

function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [mensagemSnackBar, setMensagemSnackBar] = useState(null);

    const { setToken } = useContext(StoreContext);

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

    const handleSubmit = async () => {

        if (email.trim() !== "" && password.trim() !== "") {
            Api.login({ "email": email, "password": password })
                .then((response) => {
                    setToken(response.data.token);
                    return navigate("/eventos");
                })
                .catch((error) => {
                    handleClickSnackBar(error.response.data)
                });
        } else {
            handleClickSnackBar("Preencha todos os campos")
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%', // Para ocupar toda a largura disponível
                            maxWidth: '80px', // Limita a largura máxima
                            minWidth: '70px',
                            height: 'auto', // Ajusta a altura automaticamente com base na largura
                            backgroundImage: `url(${Logo})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain', // Mantém a proporção da imagem
                            backgroundPosition: 'center',
                            paddingTop: '25%', // Mantém uma proporção de 1:1 para o Box
                        }}
                    />
                    <Typography component="h1" variant="h5">
                        AD Monteiro - PB
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >

                            <Button
                                onClick={() => { handleSubmit() }}
                                fullWidth
                                variant="contained"
                                className="entrar"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    width: "50%",
                                }}
                            >
                                Entrar
                            </Button>
                        </Box>
                    </Box>
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
        </ThemeProvider>
    );
}

export default Login;