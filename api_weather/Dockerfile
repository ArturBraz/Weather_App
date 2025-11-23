FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .
RUN npm run build


FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# ⬇️ ESSENCIAL
COPY --from=builder /app/node_modules ./node_modules

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]