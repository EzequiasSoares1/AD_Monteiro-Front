import axios from "axios";

const api = axios.create({
    
     baseURL: "https://ad-monteiro-back.onrender.com",
});

export const login = async (data) => {
    return await api.post("/auth", data);
};

export const getEventActive = async () => {

    return await api.get("/event/active");

};

export const getAllEvent = async (token) => {
    return await api.get(`/event`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};

export const getReport = async (id, token) => {

    return await api.get(`/reportsRootRestricts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};

export const postCreatePayment = async (paymentData) => {
    return await api.post("/createPay", paymentData);
};

// Aqui criamos a preferência de pagamento para o Mercado Pago
export const postCreatePreference = async (evento) => {
    return await api.post("/createPay/create_preference", evento);
};

export default {
    login,
    getEventActive,
    getAllEvent,
    postCreatePayment,
    getReport,
    postCreatePreference,
};