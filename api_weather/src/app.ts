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

export const buildApp = async () => {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  //Essencial para Fastify entender Zod
  app.setValidatorCompiler(validatorCompiler);//input: Validação de entrada de dados,pré handler da rota
  app.setSerializerCompiler(serializerCompiler);//output: garantir e formatar os dados de saída (Output/Response), pós handler da rota

  //Handler global de erros
  app.register(errorHandlerPlugin);

  // registrar plugins
  app.register(swaggerPlugin);
  app.register(prismaPlugin);

  // registrar rotas
  //app.register(usersRoutes, { prefix: '/users' })

  return app;
};
