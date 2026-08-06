#!/bin/bash

echo "Stopping containers..."
docker compose down

echo "Removing unused Docker resources..."
docker system prune -f

echo "Cleanup completed!"