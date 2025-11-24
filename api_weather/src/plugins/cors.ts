import { FastifyPluginAsync } from "fastify";
import fastifyCors from "@fastify/cors";

const corsPlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifyCors, {
    origin: true, // FRONT
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
};

export default corsPlugin;
