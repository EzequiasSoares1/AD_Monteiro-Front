import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    CircularProgress
} from "@mui/material";
import { MSG_CHAVE_PIX_COPIADA } from '../../utils/message';
import Api from "../../services/Api";
import "./style.css";

function PaymentPix(props) {
    const { idEvento, nome, telefone, cidade, email, sexo, tamanho, telefoneEmergencia, handleCloseDialog, setMensagemSnackBar, setOpenSnackBar } = props;
    const navigate = useNavigate();

    const [pixKey, setPixKey] = useState('');
    const [imageQRCode, setImageQRCode] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    
    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem);
        setOpenSnackBar(true);
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
            criarImagemQRCode(response.data); 
            setPaymentSuccess(true); 
        } catch (err) {
            

            handleClickSnackBar(err.response?.data || "Ocorreu um erro ao criar o pagamento");
            handleCloseDialog();
            setPaymentSuccess(false); 
            
        } finally {
            setLoading(false); 
        }
    };

    const handleCopyPixKey = () => {
        navigator.clipboard.writeText(pixKey);
        handleClickSnackBar(MSG_CHAVE_PIX_COPIADA);
    };

    useEffect(() => {
        createPayment(); 
    }, []);

    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <CircularProgress size={60} sx={{ marginBottom: 2, padding: '5px' }} />
                    <Typography variant="h6">  Processando...  </Typography>
                </Box>
            ) : paymentSuccess ? ( 
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
                    <Typography variant='subtitle1' sx={{marginBottom: "20px" }}>
                        Também enviamos a chave PIX para o seu e-mail. 
                        <br />
                        Caso tenha algum problema, você pode efetuar o pagamento por lá ou entrar em contato conosco pelo e-mail:
                    </Typography>
                    <Box component="span" sx={{ fontWeight: 'bold', marginBottom: "20px" }} >
                        monteiroassembleiadedeus@gmail.com
                    </Box>
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
                     <Button
                        variant="contained"
                        className="enviar"
                        sx={{
                            width: "23%",
                            minWidth: "200px"
                        }}
                        onClick={() => { navigate("/eventos") }}
                     >
                       PAGO
                    </Button>
                </Box>
                
            ) : null}
          
        </>
    );
}

export default PaymentPix;
