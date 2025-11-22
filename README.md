# 🌦️ App Weather — Backend + Frontend monorepo

Este repositório contém:

- **api_weather/** → API Node.js responsável por consultar o OpenWeatherMap, salvar no banco e expor endpoints.
- **client_weather/** → Aplicação React (opcional) para consumir a API.

# Objetivo

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
- React + Vite

## Entregaveis
- Repositório no GitHub
- API Node.js(Container)
- PostgreSQL(Container)

---
# Configuração e execução do projeto

## Como rodar o backend 
```bash
cd api_weather
npm install
npm run dev
```

## Como rodar o frontend
```bash
cd client_weather
npm install
npm run dev
```
