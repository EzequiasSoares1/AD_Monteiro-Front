import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    Box,
    Button,
    Typography,
    TextField,
    Snackbar,
    Alert,
    IconButton,
    InputAdornment
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

    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem)
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
        setPixKey(paymentPix.qrCode); // Definir a chave PIX
    }

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
            criarImagemQRCode(response.data);
        } catch (err) {
            handleClickSnackBar(err.response.data);
        }
    };

    const handleCopyPixKey = () => {
        navigator.clipboard.writeText(pixKey);
        handleClickSnackBar(MSG_CHAVE_PIX_COPIADA);
    };

    useEffect(() => {

        createPayment(); // Chama a função assíncrona

    }, []);

    return (
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
            <Typography variant='subtitle1' >
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
                        width: '100%', // Para ocupar toda a largura disponível
                        maxWidth: '200px', // Limita a largura máxima
                        minWidth: '80px',
                        height: 'auto', // Ajusta a altura automaticamente com base na largura
                        backgroundImage: `url(${imageQRCode})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain', // Mantém a proporção do QR Code
                        backgroundPosition: 'top center',
                        paddingTop: '40%', // Mantém uma proporção de 1:1 para o Box
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
        </Box>
    );
}

export default PaymentPix;