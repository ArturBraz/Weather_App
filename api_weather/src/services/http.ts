import axios from "axios";

export const axiosWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 5000,
});

export const axiosApi = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 3333}/`,
  timeout: 5000,
});
