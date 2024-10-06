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

export const getReport = async (nameEvent) => {

    return await api.get(`/reportsRootRestricts/${nameEvent}`);

};

export const postCreatePayment = async (paymentData) => {
    return await api.post("/createPay", paymentData);
};

export default {
    login,
    getEventActive,
    postCreatePayment,
    getReport,
};