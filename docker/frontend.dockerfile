FROM node:20-slim

RUN apt-get update && \
    apt-get install -y build-essential curl git pkg-config && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY frontend/ ./frontend/
COPY .env .env
COPY ./docker/frontend-entrypoint.sh ./frontend-entrypoint.sh

WORKDIR /app/frontend

RUN rm -rf node_modules package-lock.json && \
    npm install && \
    npm run build && \
    npm install -g serve

WORKDIR /app

RUN chmod +x frontend-entrypoint.sh

EXPOSE 80

CMD ["./frontend-entrypoint.sh"]
