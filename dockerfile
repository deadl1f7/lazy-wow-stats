FROM node:8

WORKDIR /usr/src/dist/

COPY package*.json ./
COPY dist/ ./

RUN npm install