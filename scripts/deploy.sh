#!/bin/bash

echo "Stopping existing containers..."
docker compose down

echo "Building latest images..."
docker compose build

echo "Starting application..."
docker compose up -d

echo "Deployment completed successfully!"