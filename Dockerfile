FROM node:14.15.4
WORKDIR /app
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=production
ADD . /app
RUN npm ci
RUN scripts/build-frontend.sh

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/dist /usr/share/nginx/html/
