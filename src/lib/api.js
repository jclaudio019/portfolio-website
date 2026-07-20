import axios from "axios";
import { profile } from "../data/content";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;

export const sendContactMessage = async (payload) => {
    if (!API) {
        const subject = encodeURIComponent(payload.subject || "Portfolio contact");
        const body = encodeURIComponent(
            `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
        );
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        return { ok: true, via: "mailto" };
    }
    const { data } = await axios.post(`${API}/contact`, payload);
    return data;
};
