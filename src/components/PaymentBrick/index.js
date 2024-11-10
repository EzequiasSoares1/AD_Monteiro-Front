import React, { useEffect, useRef, useState } from 'react';
import { Snackbar, Alert, CircularProgress, Box, Typography } from "@mui/material";
import { Payment, StatusScreen, initMercadoPago } from '@mercadopago/sdk-react';
import Api from "../../services/Api";
import { useNavigate } from 'react-router-dom';

function PaymentBrick(props) {
    const { evento, nome, telefone, cidade, email, sexo, tamanho, telefoneEmergencia, handleCloseDialog, setMensagemSnackBar, setOpenSnackBar } = props;
    const navigate = useNavigate();

    const [preferenceID, setPreferenceID] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [loading, setLoading] = useState(false);
    const [showStatusScreen, setShowStatusScreen] = useState(false); 
    const paymentBrickContainer = useRef(null);

    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem);
        setOpenSnackBar(true);
    };

    useEffect(() => {
        if (paymentBrickContainer.current) {
            initMercadoPago('APP_USR-de87217c-7d9e-4c63-9d11-75ba42eeaab7', { locale: 'pt' });
        }
       
    }, []);

    const initialization = {
        amount: evento.value,
        preferenceID: preferenceID,
    };

    const customization = {
        paymentMethods: {
            creditCard: 'all',
            selectInstallments: "all",
            maxInstallments: 12
        },
    };

    const onSubmit = async ({ selectedPaymentMethod, formData }) => {
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
                    "event_id": evento.id
                },
                "paymentType": "CARD",
                "cardTransationDTO": {
                    "token": formData.token,
                    "issuerId": formData.issuer_id,
                    "paymentMethodId": formData.payment_method_id,
                    "installments": formData.installments,
                    "CPFHolder": formData.payer.identification.number,
                    "email": formData.payer.email
                }
            });
            console.log(response)
            setPreferenceID(response.data.id);
            setPaymentId(response.data.id);
            setShowStatusScreen(true);         
            handleCloseDialog();
           

        } catch (err) {
            if(err.response.data){
                handleClickSnackBar(err.response.data);
            }
            
            if(err.response.data.id){
                setPaymentId(err.response.data.id);
                setShowStatusScreen(true);         
            }

            handleCloseDialog();
          
        } finally { 
            setLoading(false); 
        }
    };

    const onError = async (error) => {
        handleClickSnackBar("Verifique os dados do seu cartão");
        console.log(error);
    };

    const onReady = async () => {
        // Callback chamado quando o Brick estiver pronto.
    };

    return (
        <div ref={paymentBrickContainer}>
            {loading && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <Box sx={{ textAlign: "center", color: "white" }}>
                        <CircularProgress size={60} sx={{ marginBottom: 2 }} />
                        <Typography variant="h6">Processando pagamento...</Typography>
                    </Box>
                </Box>
            )}

            {!showStatusScreen && (
                <Box>
                    <Payment
                        initialization={initialization}
                        customization={customization}
                        onSubmit={onSubmit}
                        onReady={onReady}
                        onError={onError}
                    />
                </Box>
            )}

            {showStatusScreen && (
                <Box>
                    <StatusScreen
                        initialization={{ paymentId: paymentId }}
                        onReady={onReady}
                        onError={onError}
                    />
                </Box>
                
            )}
        </div>
    );
};

export default PaymentBrick;