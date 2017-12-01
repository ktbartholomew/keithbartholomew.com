FROM node:8.9.1
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=production
ADD . .
RUN npm install
RUN scripts/build-frontend.sh

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 dist /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html
