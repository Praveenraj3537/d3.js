FROM docker.io/postgres:latest

ENV POSTGRES_PASSWORD=asyin
ENV POSTGRES_USER=asyin

COPY init_db.sh /docker-entrypoint-initdb.d/
COPY politifact.pgsql .

EXPOSE 5432