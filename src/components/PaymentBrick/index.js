import React, { useEffect, useState } from "react";
import { Snackbar, Alert, CircularProgress, Box, Typography } from "@mui/material";
import { useMercadopago } from "react-sdk-mercadopago";
import Api from "../../services/Api";
import { useNavigate } from "react-router-dom";

function PaymentBrickv2(props) {
    const { evento, nome, telefone, cidade, email, sexo, tamanho, telefoneEmergencia, handleCloseDialog, setMensagemSnackBar, setOpenSnackBar } = props;
    const navigate = useNavigate();

    const [preferenceID, setPreferenceID] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [loading, setLoading] = useState(false);
    const [showStatusScreen, setShowStatusScreen] = useState(false);

    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem);
        setOpenSnackBar(true);
    };

    // Inicializa o SDK do Mercado Pago
    const mercadopago = useMercadopago.v2("APP_USR-9cd91aaf-5439-47f8-8080-6a80e952ac4c", { locale: "pt-BR" });

    useEffect(() => {
        const fetchPreference = async () => {
            try {
                const response = await Api.postCreatePreference({
                    id: evento.id,
                    title: evento.name,
                    quantity: 1,
                    price: evento.value,
                });

                setPreferenceID(response.data.id);
            } catch (error) {
                handleClickSnackBar("Erro ao criar preferência de pagamento");
            }
        };

        fetchPreference();
    }, [evento]);

    useEffect(() => {
        if (mercadopago && preferenceID) {
            const bricksBuilder = mercadopago.bricks();

            bricksBuilder.create("payment", "payment-brick-container", {
                initialization: {
                    amount: evento.value,
                    preferenceId: preferenceID,
                },
                customization: {
                    paymentMethods: {
                        creditCard: "all",
                        selectInstallments: "all",
                        maxInstallments: 12,
                    },
                },
                callbacks: {
                    onReady: (e) => console.log("Brick pronto!: ",e),
                    onSubmit: async ({ formData }) => {
                        console.log(formData)
                        try {
                            setLoading(true);
                            const response = await Api.postCreatePayment({
                                registered: {
                                    name: nome,
                                    telephone: telefone,
                                    city: cidade,
                                    emergencyContact: telefoneEmergencia,
                                    email: email,
                                    sex: sexo,
                                    shirtSize: tamanho,
                                    registrationStatus: "CONCLUDED",
                                    event_id: evento.id,
                                },
                                paymentType: "CARD",
                                cardTransationDTO: {
                                    token: formData.token,
                                    issuerId: formData.issuer_id,
                                    paymentMethodId: formData.payment_method_id,
                                    installments: formData.installments,
                                    CPFHolder: formData.payer.identification.number,
                                    email: formData.payer.email,
                                    firstName: nome
                                },
                            });

                            setLoading(false);
                            setPaymentId(response.data.id);
                            setShowStatusScreen(true);

                            if (response.data.statusPayment === "approved") {
                                handleClickSnackBar("PAGAMENTO CONCLUIDO COM SUCESSO!!");
                                setTimeout(() => {
                                    navigate("/eventos");
                                }, 4000);
                            }
                            else{
                                handleClickSnackBar("OCORREU UM ERRO COM O PAGAMENTO, VERIFIQUE OS DADOS DO CARTÃO");
                            }    
                        } catch (err) {
                            setLoading(false);
                            console.log(err.response);
                            handleClickSnackBar(err.response?.data || "Ocorreu um erro ao criar o pagamento");
                        }
                    },
                    onError: (error) => {
                        handleClickSnackBar("OCORREU UM ERRO COM O PAGAMENTO, VERIFIQUE OS DADOS DO CARTÃO");
                        console.error(error);
                    },
                },
            });
        }
    }, [mercadopago, preferenceID]);

    return (
        <div>
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
                    <div id="payment-brick-container" />
                </Box>
            )}

            {showStatusScreen && (
                <Box>
                    <div id="status-screen-brick-container" />
                </Box>
            )}
        </div>
    );
}

export default PaymentBrickv2;
