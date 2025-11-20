import fp from "fastify-plugin";
import { type FastifyInstance } from "fastify";

export const errorHandlerPlugin = fp(async function (app: FastifyInstance) {
  app.setErrorHandler((error: unknown, request, reply) => {
    // Erro de validação do Zod
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as any).name === "ZodError"
    ) {
      return reply.status(400).send({
        message: "Erro de validação nos dados enviados",
        issues: (error as any).errors,
      });
    }

    // Erro de registro não encontrado (Prisma)
    if ((error as any).code === "P2025") {
      return reply.status(404).send({
        message: "Registro não encontrado",
      });
    }

    //Erro de violação de unique constraint (Prisma)
    if ((error as any).code === "P2002") {
      return reply.status(409).send({
        message: "Registro duplicado",
      });
    }

    // Erros genéricos
    request.log.error(error);
    return reply.status(500).send({
      message: "Erro interno do servidor",
    });
  });
});
