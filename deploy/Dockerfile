# syntax=docker.io/docker/dockerfile:1.7-labs

# Build Angular library
FROM node:latest as lib-i18n
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --maxsockets 1

COPY angular.json angular.json
COPY tsconfig.app.json tsconfig.json tsconfig.spec.json ./

COPY projects/i18n projects/i18n

RUN npm run build-i18n

# Build Angular library
FROM node:latest as lib-state-mapper
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --maxsockets 1

COPY angular.json angular.json
COPY tsconfig.app.json tsconfig.json tsconfig.spec.json ./

COPY projects/state-mapper projects/state-mapper

RUN npm run build-state-mapper

# Build Angular project
FROM node:latest as angular
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --maxsockets 1

COPY --from=lib-i18n app/dist/i18n app/dist/i18n
COPY --from=lib-state-mapper app/dist/state-mapper app/dist/state-mapper

COPY --exclude=deploy . .
RUN npm run build --omit=dev

# Using Nginx webserver
FROM nginx:alpine

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY deploy/nginx.proxy.conf /etc/nginx/nginx.proxy.conf

COPY --from=angular /app/dist/studyum /usr/share/nginx/html
