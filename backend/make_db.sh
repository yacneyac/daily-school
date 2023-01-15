#!/bin/sh

# docker-compose -f ./compose-db.yml up -d
# psql -h localhost -p 5432 --username db_user --dbname school
# psql -h localhost -p 5432 --username db_user --dbname postgres -c "DROP DATABASE school"

# psql -h localhost -p 5432 --username db_user --dbname postgres -c "CREATE DATABASE school OWNER db_user"

# add version script alembic revision -m "create account table"
poetry run alembic revision --autogenerate -m "init DB"
# alembic revision --autogenerate -m "Add a column"

# create DB
poetry run alembic upgrade head

poetry run python3.9 ./populate_db.py