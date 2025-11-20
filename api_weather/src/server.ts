// src/server.ts
import { buildApp } from './app.js'

const DEFAULT_PORT = 3000
const DEFAULT_HOST = '0.0.0.0' // Boa prática para containers/servidores

const start = async () => {
  try {
    // 2. Aguarda a construção da aplicação (inclui conexão DB e registro de plugins)
    const app = await buildApp()

    const port = Number(process.env.PORT || DEFAULT_PORT)
    const host = process.env.HOST || DEFAULT_HOST

    await app.listen({ port, host })

    console.log(`✅ Server running at http://${host}:${port}`)
    console.log(`📚 Swagger docs at http://${host}:${port}/docs`)
  } catch (err) {
    console.error('❌ Falha ao iniciar o servidor:', err)
    process.exit(1)
  }
}

start()