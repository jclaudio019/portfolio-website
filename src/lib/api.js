import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const sendContactMessage = async (payload) => {
    const { data } = await axios.post(`${API}/contact`, payload);
    return data;
};
