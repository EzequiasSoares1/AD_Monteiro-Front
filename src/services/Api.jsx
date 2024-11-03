import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});


export const login = async (data) => {
    return await api.post("/auth", data);
};

export const getEventActive = async () => {

    return await api.get("/event/active");

};

export const getReport = async (nameEvent, token) => {

    return await api.get(`/reportsRootRestricts/${nameEvent}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

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