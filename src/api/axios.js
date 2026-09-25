import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    appid: apiKey,
  },
});

export const geoInstance = axios.create({
  baseURL: import.meta.env.VITE_API_GEO_LOCATION,
  params: {
    appid: apiKey,
  },
});