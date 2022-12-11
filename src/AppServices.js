import axios from "axios";

export const getCovidSumary = async () => {
    const response = await axios.get(`${import.meta.env.VITE_COVID_19_API_URL}/summary`);
    return response.data;
}

export const getCountryDetailsByName = async (countryName) => {
    const response = await axios.get(`${import.meta.env.VITE_COUNTRY_API_URL}/name/${countryName}`);
    return response.data;
}

export const getCountryDetailsByCode = async (countryCode) => {
    const response = await axios.get(`${import.meta.env.VITE_COUNTRY_API_URL}/alpha/${countryCode}`);
    return response.data;
}