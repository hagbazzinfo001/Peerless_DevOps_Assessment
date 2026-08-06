#!/bin/bash

curl -f http://localhost:5000/health

if [ $? -eq 0 ]; then
    echo "Backend Healthy"
else
    echo "Backend Failed"
    exit 1
fi