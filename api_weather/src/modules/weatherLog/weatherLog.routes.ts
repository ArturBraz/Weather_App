import { FastifyInstance } from "fastify";
import {
  FetchWeatherQuerySchema,
  WeatherIdParamSchema,
} from "./weatherLog.schema.js";
import { weatherController } from "./weatherLog.controller.js";

export async function weatherLogRoutes(app: FastifyInstance) {
  // GET → Buscar clima externo
  app.get(
    "/weather",
    {
      schema: {
        summary: "Fetch weather from OpenWeather API",
        tags: ["Weather"],
        querystring: FetchWeatherQuerySchema,
      },
    },
    weatherController.fetchWeather
  );

  // POST → Salvar no DB
  app.post(
    "/weather",
    {
      schema: {
        summary: "Save weather info",
        tags: ["Weather"],
        body: FetchWeatherQuerySchema,
      },
    },
    weatherController.saveWeather
  );

  // GET → Listar DB
  app.get(
    "/weather/logs",
    {
      schema: {
        summary: "List all weather logs",
        tags: ["Weather"],
      },
    },
    weatherController.findAll
  );

  // DELETE → Remover por ID
  app.delete(
    "/weather/:id",
    {
      schema: {
        summary: "Delete weather log by ID",
        tags: ["Weather"],
        params: WeatherIdParamSchema,
      },
    },
    weatherController.delete
  );
}
