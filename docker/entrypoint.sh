#!/bin/bash

cd /app/backend

python manage.py makemigrations 
python manage.py migrate 
python manage.py loaddata dump.json 

daphne -b 0.0.0.0 -p 8001 config.asgi:application &

cd /app/frontend

serve -s dist -l 5173 &

wait -n
