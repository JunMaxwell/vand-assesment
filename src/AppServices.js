import axios from "axios";

export const getCovidSumary = async () => {
    const response = await axios.get(`${import.meta.env.VITE_COVID_19_API_URL}/summary`);
    return response.data;
}