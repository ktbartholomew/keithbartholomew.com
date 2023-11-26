FROM node:20-slim AS build
WORKDIR /app
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=production

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --omit=dev
COPY . .
RUN npm run build

FROM node:20-slim AS runtime
WORKDIR /app

COPY --from=build /app/out out
RUN npm install -g serve

EXPOSE 3000

CMD ["npx", "serve", "-n", "out"]
