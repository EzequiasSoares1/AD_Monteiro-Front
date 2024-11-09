import React, { useEffect, useRef, useState } from 'react';
import { Snackbar, Alert, CircularProgress, Box,Typography } from "@mui/material";
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Payment } from '@mercadopago/sdk-react';
import Api from "../../services/Api";

function PaymentBrick(props) {

    const { evento, nome, telefone, cidade, email, sexo, tamanho, telefoneEmergencia } = props;

    const [preferenceID, setPreferenceID] = useState("");
    const [loading, setLoading] = useState(false); // Adicionado estado de loading
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [mensagemSnackBar, setMensagemSnackBar] = useState(null);
    const paymentBrickContainer = useRef(null);

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

    useEffect(() => {
        if (paymentBrickContainer.current) {
            initMercadoPago('APP_USR-a3f3d3d7-2b03-4aab-bc38-be641ebc11fc', { locale: 'pt' });
        }
    }, []);

    const initialization = {
        amount: evento.value,
        preferenceId: preferenceID,
    };

    const customization = {
        paymentMethods: {
            creditCard: "all",
            installments: {
                enabled: true, // Habilita a possibilidade de parcelas
                options: [1, 2, 3, 4, 5, 6], // Define as opções de parcelas disponíveis
            }
        },
    };

    const onSubmit = async (
        { selectedPaymentMethod, formData }
    ) => {
        // Inicia o loading antes de chamar a API
        setLoading(true);

        // callback chamado ao clicar no botão de submissão dos dados
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
            setPreferenceID(response.data.id);
        } catch (err) {
            handleClickSnackBar(err.response.data);
        } finally {
            setLoading(false); // Finaliza o loading após a resposta da API
        }
    };

    const onError = async (error) => {
        // callback chamado para todos os casos de erro do Brick
        console.log(error);
    };

    const onReady = async () => {
        /*
          Callback chamado quando o Brick estiver pronto.
          Aqui você pode ocultar loadings do seu site, por exemplo.
        */
    };

    return (
        <div ref={paymentBrickContainer}>
            {/* Exibir carregamento enquanto aguardamos a resposta da API */}
            {loading && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semitransparente
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999, // Fica acima do conteúdo
                    }}
                >
                    <Box sx={{ textAlign: "center", color: "white" }}>
                        <CircularProgress size={60} sx={{ marginBottom: 2 }} />
                        <Typography variant="h6">Processando pagamento...</Typography>
                    </Box>
                </Box>
            )}

            {/* Exibir o componente Payment após a resposta da API */}
            {!loading && (
                <Payment
                    initialization={initialization}
                    customization={customization}
                    onSubmit={onSubmit}
                    onReady={onReady}
                    onError={onError}
                />
            )}

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackBar}
                autoHideDuration={7000}
                onClose={handleCloseSnackBar}
            >
                <Alert severity="error">
                    {mensagemSnackBar}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PaymentBrick;
