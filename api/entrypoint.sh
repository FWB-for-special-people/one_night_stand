#!/bin/bash

echo "Waiting for postgres ..."

while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 0.1
  done

  echo "PostgreSQL started"

echo "Running Django migrations..."
python manage.py migrate
echo "Django migrations completed."

echo "Collecting static files..."
python manage.py collectstatic --noinput --clear
echo "Django static files collected."

echo "Starting Gunicorn..."
exec gunicorn config.wsgi:application \
    --reload \
    --bind 0.0.0.0:8001 \
    --workers 3 \
    --log-level info
echo "Server started."
exec "$@"
