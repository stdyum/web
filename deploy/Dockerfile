# syntax=docker.io/docker/dockerfile:1.7-labs

# Build Angular project
FROM node:lts as node
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --maxsockets 1

COPY --exclude=deploy . .
RUN npm run build-state-mapper
RUN npm run build-i18n
RUN npm run build --omit=dev

# Using Nginx webserver
FROM nginx:alpine

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY deploy/nginx.proxy.conf /etc/nginx/nginx.proxy.conf

COPY --from=node  /app/dist/studyum /usr/share/nginx/html
