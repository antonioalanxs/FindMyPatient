#!/bin/bash

cd /app/backend

python manage.py makemigrations
python manage.py migrate
python manage.py loaddata dump.json

daphne -b 0.0.0.0 -p 80 config.asgi:application &

wait -n
