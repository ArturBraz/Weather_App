import axios from "axios";

export const axiosWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 5000,
});

export const axiosApi = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:4000",
  timeout: 5000,
});
