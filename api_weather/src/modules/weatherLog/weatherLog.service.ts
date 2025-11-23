import { axiosWeather } from "../../services/http.js";

export interface WeatherSearchParams {
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
}

export async function fetchWeather(params: WeatherSearchParams) {
  const apiKey = process.env.OPENWEATHER_KEY;
  if (!apiKey) {
    throw new Error("Esta faltando a variavel de ambiente OPENWEATHER_KEY.");
  }

  const { city } = params;

  if (!city) {
    throw new Error("Você precisa informar uma cidade.");
  }

  return await requestWeather({
    q: city,
    appid: apiKey,
    units: "metric",
  });

}

/**
 * Função utilitária interna usada para fazer a request final.
 */
async function requestWeather(params: Record<string, string>) {
  try {
    const { data } = await axiosWeather.get("/weather", { params });
    return data;
  } catch (err: any) {
    const error = err.response?.data || err.message;
    throw new Error(
      typeof error === "string" ? error : JSON.stringify(error, null, 2)
    );
  }
}