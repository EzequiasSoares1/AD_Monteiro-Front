import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    Box,
    Typography,
    TextField,
    Snackbar,
    Alert,
    IconButton,
    InputAdornment,
    CircularProgress
} from "@mui/material";
import { MSG_CHAVE_PIX_COPIADA } from '../../utils/message';
import Api from "../../services/Api";
import "./style.css";

function PaymentPix(props) {
    const { idEvento, nome, telefone, cidade, email, sexo, tamanho, telefoneEmergencia } = props;
    const navigate = useNavigate();

    const [pixKey, setPixKey] = useState('');
    const [imageQRCode, setImageQRCode] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [mensagemSnackBar, setMensagemSnackBar] = useState(null);
    const [loading, setLoading] = useState(true); // Controls the loading state
    const [paymentSuccess, setPaymentSuccess] = useState(false); // Track payment success

    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem);
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const criarImagemQRCode = (paymentPix) => {
        setImageQRCode(`data:image/png;base64,${paymentPix.qrCode64}`);
        setPixKey(paymentPix.qrCode); // Set PIX key
    };

    const createPayment = async () => {
        try {
            const response = await Api.postCreatePayment({
                "registered": {
                    "name": nome,
                    "telephone": telefone,
                    "city": cidade,
                    "emergencyContact": telefoneEmergencia,
                    "email": email,
                    "sex": sexo,
                    "shirtSize": tamanho,
                    "registrationStatus": "CONCLUDED",
                    "event_id": idEvento
                },
                "paymentType": "PIX"
            });
            criarImagemQRCode(response.data); // Call function to set the image and key
            setPaymentSuccess(true); // Set payment success to true
        } catch (err) {
            handleClickSnackBar(err.response?.data || "Ocorreu um erro ao criar o pagamento");
            setPaymentSuccess(false); // Set payment success to false in case of error
        } finally {
            setLoading(false); // Disable loading after API response
        }
    };

    const handleCopyPixKey = () => {
        navigator.clipboard.writeText(pixKey);
        handleClickSnackBar(MSG_CHAVE_PIX_COPIADA);
    };

    useEffect(() => {
        createPayment(); // Call createPayment on component mount
    }, []);

    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <CircularProgress size={60} sx={{ marginBottom: 2 }} />
                    <Typography variant="h6">Processando...</Typography>
                </Box>
            ) : paymentSuccess ? ( // Only render payment details if the payment was successful
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    <Typography variant='subtitle1'>
                        Ao realizar o pagamento via PIX, verifique seu email para confirmar
                        o recebimento da chave pix. Qualquer dúvida, contate-nos pelo email
                    </Typography>
                    <Box component="span" sx={{ fontWeight: 'bold', marginBottom: "30px" }} >
                        monteiroassembleiadedeus@gmail.com
                    </Box>

                    <Typography variant='subtitle1' sx={{ marginBottom: "30px" }}>
                        Que a paz do Senhor Jesus esteja convosco
                    </Typography>

                    {imageQRCode && (
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '200px',
                                minWidth: '80px',
                                height: 'auto',
                                backgroundImage: `url(${imageQRCode})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                backgroundPosition: 'top center',
                                paddingTop: '40%',
                            }}
                        />
                    )}
                    {pixKey && (
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={pixKey}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleCopyPixKey}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ marginBottom: '40px' }}
                        />
                    )}
                </Box>
            ) : null}

            {/* Snackbar is shown only for errors */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackBar}
                autoHideDuration={7000}
                onClose={handleCloseSnackBar}
            >
                <Alert severity={mensagemSnackBar === MSG_CHAVE_PIX_COPIADA ? "success" : "error"}>
                    {mensagemSnackBar}
                </Alert>
            </Snackbar>
        </>
    );
}

export default PaymentPix;
