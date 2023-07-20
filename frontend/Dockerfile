FROM docker.io/node:latest

WORKDIR /usr/src/app

COPY package*.json .
COPY . .

RUN ["npm", "install", "-g", "http-server"]
CMD ["http-server"]

EXPOSE 8080