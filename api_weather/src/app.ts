// src/app.ts
import Fastify from "fastify";
import {swaggerPlugin} from "./plugins/swagger.js";
import {prismaPlugin} from "./plugins/prisma.js";
import { errorHandlerPlugin } from "./plugins/errorHandler.js";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { weatherLogRoutes } from "./modules/weatherLog/weatherLog.routes.js";


export const buildApp = async () => {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  //Essencial para Fastify entender Zod
  app.setValidatorCompiler(validatorCompiler);//input: Validação de entrada de dados,pré handler da rota
  app.setSerializerCompiler(serializerCompiler);//output: garantir e formatar os dados de saída (Output/Response), pós handler da rota

  app.addHook("onRequest", (req, reply, done) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  reply.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return reply.status(204).send();
  }

  done();
});

  //Handler global de erros
  app.register(errorHandlerPlugin);

  // registrar plugins
  app.register(swaggerPlugin);
  app.register(prismaPlugin);

  // registrar rotas
  app.register(weatherLogRoutes, { prefix: "/api" });

  return app;
};
