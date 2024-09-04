import React, { useEffect, useRef, useState } from 'react';
import { Snackbar, Alert } from "@mui/material";
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Payment } from '@mercadopago/sdk-react';
import Api from "../../services/Api";

function PaymentBrick(props) {

    const { evento, nome, telefone, cidade, email, sexo, tamanho } = props;

    const [preferenceID, setPreferenceID] = useState("");

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
        },
    };
    const onSubmit = async (
        { selectedPaymentMethod, formData }
    ) => {

        // callback chamado ao clicar no botão de submissão dos dados
        return new Promise((resolve, reject) => {
            try {
                const response = Api.postCreatePayment({
                    "registered": {
                        "name": nome,
                        "telephone": telefone,
                        "city": cidade,
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
                setPreferenceID(response.data.id)
            } catch (err) {
                handleClickSnackBar(err.response.data);
            }

        });
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
            <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
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
