// src/plugins/swagger.ts
import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

export const swaggerPlugin = fp(async (app) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'API Documentation',
        description: 'Documentação da API usando Fastify + Zod + Swagger + Axios',
        version: '1.0.0',
      },
      servers: [
        { url: 'http://localhost:3333', description: 'dev' }
      ]
    }
  })

  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  })
})
