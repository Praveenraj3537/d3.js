FROM docker.io/mongo:latest

ENV MONGO_INITDB_ROOT_PASSWORD=asyin
ENV MONGO_INITDB_ROOT_USERNAME=asyin
ENV MONGO_INITDB_DATABASE=asyin

COPY init_db.sh /docker-entrypoint-initdb.d/
COPY penguins.csv .
COPY flare.json .

EXPOSE 27017