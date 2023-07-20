FROM docker.io/node:latest

WORKDIR /usr/src/app

COPY package*.json .
COPY app.js .
COPY static ./static

RUN ["npm", "install"]
CMD ["npm", "start"]

EXPOSE 3000