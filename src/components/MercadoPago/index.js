import React, { useEffect } from 'react';

function PaymentBrick() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.onload = () => {
            const mp = new window.MercadoPago('YOUR_PUBLIC_KEY', {
                locale: 'pt'
            });
            const bricksBuilder = mp.bricks();

            const renderPaymentBrick = async (bricksBuilder) => {
                const settings = {
                    initialization: {
                        amount: 100,
                        preferenceId: "<PREFERENCE_ID>",
                        payer: {
                            firstName: "",
                            lastName: "",
                            email: "",
                        },
                    },
                    customization: {
                        visual: {
                            style: {
                                theme: "default",
                            },
                        },
                        paymentMethods: {
                            creditCard: "all",
                            debitCard: "all",
                            atm: "all",
                            maxInstallments: 1
                        },
                    },
                    callbacks: {
                        onReady: () => {
                            // Callback chamado quando o Brick está pronto
                        },
                        onSubmit: ({ selectedPaymentMethod, formData }) => {
                            return new Promise((resolve, reject) => {
                                fetch("/process_payment", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(formData),
                                })
                                    .then((response) => response.json())
                                    .then((response) => {
                                        // receber o resultado do pagamento
                                        resolve();
                                    })
                                    .catch((error) => {
                                        // manejar a resposta de erro ao tentar criar um pagamento
                                        reject();
                                    });
                            });
                        },
                        onError: (error) => {
                            console.error(error);
                        },
                    },
                };
                window.paymentBrickController = await bricksBuilder.create(
                    "payment",
                    "paymentBrick_container",
                    settings
                );
            };

            renderPaymentBrick(bricksBuilder);
        };
        document.body.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="paymentBrick_container"></div>
    );
};

export default PaymentBrick;
