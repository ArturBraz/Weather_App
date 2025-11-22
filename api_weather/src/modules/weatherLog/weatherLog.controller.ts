import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../plugins/prisma.js";
import { fetchWeather } from "./weatherLog.service.js";
import { FetchWeatherQueryType } from "./weatherLog.schema.js";

export const weatherController = {
  //GET → Buscar clima da API externa
  async fetchWeather(
    req: FastifyRequest<{ Querystring: FetchWeatherQueryType }>,
    reply: FastifyReply
  ) {
    try {
      const data = await fetchWeather(req.query);
      //console.log(data);

      return reply.send({
        city: data.name,
        country: data.sys?.country,
        weather: data.weather,
        main: data.main,
        wind: data.wind,
        coord: data.coord,
      });
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  },

  // POST → Salvar clima no DB
  async saveWeather(
    req: FastifyRequest<{ Body: FetchWeatherQueryType }>,
    reply: FastifyReply
  ) {
    try {
      const data = await fetchWeather(req.body);

      const stored = await prisma.weatherLog.create({
        data: {
          city: data.name,
          country: data.sys?.country,
          lat: data.coord?.lat,
          lon: data.coord?.lon,
          response: data, // salva tudo conforme retorno da API
        },
      });

      return reply.status(201).send(stored);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  },

  // GET → Listar registros
  async findAll(req: FastifyRequest, reply: FastifyReply) {
    const logs = await prisma.weatherLog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return reply.send(logs);
  },

  //DELETE → Remover por ID
  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return reply.status(400).send({ error: "Invalid ID" });
    }

    await prisma.weatherLog.delete({
      where: { id },
    });

    return reply.send({ message: "Deleted successfully" });
  },
};
