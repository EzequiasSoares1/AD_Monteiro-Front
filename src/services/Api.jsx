import { Axios } from "axios";
import React from "react"; 

const API = async (event) => {

    const response = await Axios.get('https://api.exemplo.com/dados');
        console.log(response.data);

}

export default API;