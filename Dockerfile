FROM nginx:latest

COPY index.html /usr/share/nginx/html
COPY dist /usr/share/nginx/html/dist
