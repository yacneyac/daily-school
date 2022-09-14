#! /usr/bin/env bash

export PYTHONPATH=/home/yac/repos/daily-school/backend/app

# Let the DB start
#python3 ./app/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
#python ./app/initial_data.py