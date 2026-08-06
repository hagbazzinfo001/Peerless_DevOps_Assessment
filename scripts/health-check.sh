#!/bin/bash

echo "Checking Backend..."

curl -f http://localhost:5000/health

if [ $? -eq 0 ]; then
    echo ""
    echo "Backend is Healthy"
else
    echo ""
    echo "Backend Health Check Failed"
    exit 1
fi