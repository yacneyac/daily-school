#!/bin/sh

# docker-compose -f ./compose-db.yml up -d
# psql -h localhost -p 5432 --username db_user --dbname school
# psql -h localhost -p 5432 --username db_user --dbname postgres -c "DROP DATABASE school"

# psql -h localhost -p 5432 --username db_user --dbname postgres -c "CREATE DATABASE school OWNER db_user"

# add version script alembic revision -m "create account table"
alembic revision --autogenerate -m "init DB"

# create DB
alembic upgrade head

python3 ./populate_db.py