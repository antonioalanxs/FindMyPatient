FROM python:3.10-slim as base

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install -y build-essential curl git pkg-config libmariadb-dev libmariadb-dev-compat && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/ ./backend/
COPY .env .env
COPY ./docker/backend-entrypoint.sh ./backend-entrypoint.sh

RUN pip install --upgrade pip && \
    pip install -r ./backend/requirements.txt

RUN chmod +x backend-entrypoint.sh

EXPOSE 80

CMD ["./backend-entrypoint.sh"]
