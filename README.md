# 🌦️ App Weather — Backend + Frontend Monorepo

Este repositório contém:
- api_weather/ → API Node.js que consulta OpenWeatherMap, salva dados climáticos no PostgreSQL e expõe endpoints REST.
- client_weather/ → Aplicação React para consultar a API (opcional).

# 🎯 Objetivo

- Extração de dados via API(OpenWeather),Utilize parâmetros dinâmicos na URL e faça a autenticação usando uma chave de API.[openweathermap](https://home.openweathermap.org/)
- armazenamento em banco de dados, 
- Git para versionamento do código.
- Armazenar no banco PostgreSQL, uma tabela é o suficiente.
- Docker: configuração de acesso remoto e uso de Docker para conteinerização.PostgreSQL e API.
- Crie uma API simples (RESTful) que permita consultar os dados armazenados no banco de dados.
  - Swagger
  - Zod
  - Prisma
  - Fastify

Adicional:
- Front:React + Vite + Tailwind

## Tecnologias
- Node.js (Fastify)
- Axios
- Prisma
- PostgreSQL
- Zod
- Swagger + Redoc
- Axios
- Docker & Docker Compose

## Frontend (opcional)
- React
- Vite
- TailwindCSS

# 📦 Estrutura dos containers (Docker Compose)

## O projeto roda dois containers:

| Serviço       | Descrição                      |
| ------------- | ------------------------------ |
| `weather_db`  | Banco PostgreSQL               |
| `weather_api` | API Fastify + Prisma + Swagger |

## 🐳 Rodando o projeto com Docker
### 1️⃣ Dentro de api_weather/, crie o arquivo `.env` ou altere o arquivo `.env.example` para `.env`
```dotenv
OPENWEATHER_KEY=sua_chave_aqui
DATABASE_URL=postgresql://postgres:postgres@weather_db:5432/weather
PORT=3333
HOST=0.0.0.0
```
### 2️⃣ Rodar tudo com Docker Compose

Na raiz do projeto (onde está o docker-compose.yml):
```bash
docker-compose up --build
```
Isso irá:
- Criar e iniciar o PostgreSQL
- Buildar a API (compilar TS → JS)
- Gerar o Prisma Client
- Executar migrations automaticamente
- Subir Fastify na porta 3333

### 3️⃣ Verificar logs da API
```bash
docker logs -f weather_api
```

### 4️⃣ Testar pelo Swagger (via container)
Abra no navegador:
👉 http://localhost:3333/docs

Todas as rotas estarão documentadas no Swagger.

# 🔧 Rodar o Backend localmente (sem Docker)
Antes de tudo, você precisa ajustar o `.env` da pasta api_weather/ para apontar para o PostgreSQL local e `HOST` para `'localhost'`.

1️⃣ Edite o arquivo .env
```dotenv
# OpenWeather
OPENWEATHER_KEY="key_here"

# Prisma
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/weather?schema=public"

# API Node.js
PORT=3333
HOST='localhost'
```

2️⃣ Se estiver usando Docker para o banco local:
```bash
docker run -d \
  --name weather_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=weather \
  -p 5432:5432 \
  postgres:16
```

3️⃣ Rode a API localmente:
```bash
cd api_weather
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```
# 🎨 Rodar o Frontend (opcional)
```bash
cd client_weather
npm install
npm run dev
```
# 🧱 Docker Compose final usado pelo projeto

Arquivo localizado na raiz:
```yml
version: "3"

services:
  db:
    image: postgres:16
    container_name: weather_db
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: weather
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: .
    container_name: weather_api
    restart: always
    ports:
      - "3333:3333"
    env_file:
      - .env
    environment:
      DATABASE_URL: ${DATABASE_URL}
      OPENWEATHER_KEY: ${OPENWEATHER_KEY}
      PORT: ${PORT}
      HOST: ${HOST}
    depends_on:
      - db

volumes:
  pgdata:

```