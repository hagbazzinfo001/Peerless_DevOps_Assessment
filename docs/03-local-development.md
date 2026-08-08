# Local Development Guide

## Overview

This guide explains how to set up the Peerless DevOps Engineering Showcase for local development.

The application consists of:

- React Frontend
- Node.js/Express Backend
- Docker support
- Docker Compose
- Nginx Reverse Proxy

You can run the application either:

- Without Docker (recommended for development)
- With Docker Compose (recommended for production simulation)

---

# Prerequisites

Ensure the following software is installed.

| Software | Recommended Version |
|-----------|--------------------|
| Git | Latest |
| Node.js | 22.x |
| npm | 10+ |
| Docker | Latest |
| Docker Compose | Latest |

Verify installation:

```bash
git --version

node -v

npm -v

docker --version

docker compose version
```

---

# Clone Repository

```bash
git clone https://github.com/hagbazzinfo001/Peerless_DevOps_Assessment.git
```

Navigate into the project.

```bash
cd Peerless_DevOps_Assessment
```

---

# Project Structure

```
Peerless_DevOps_Assessment/

backend/
frontend/
nginx/
.github/
docs/

docker-compose.yml
README.md
```

---

# Install Backend

Navigate into the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Start the server.

```bash
npm run dev
```

The backend will be available at

```
http://localhost:5000
```

---

# Verify Backend

Open:

```
http://localhost:5000/health
```

Expected response:

```json
{
  "status":"healthy"
}
```

---

# Install Frontend

Open another terminal.

Navigate into the frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the frontend.

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

# Frontend Configuration

The frontend uses Axios.

For local development:

```
VITE_API_URL=http://localhost:5000
```

Production deployment uses Nginx reverse proxy.

The frontend therefore uses:

```
/api
```

instead of

```
http://localhost:5000
```

This allows the same build to work behind Nginx.

---

# Environment Variables

Backend environment variables.

Example:

```env
APP_NAME=Peerless DevOps Showcase

APP_VERSION=1.0.0

ENVIRONMENT=development

BUILD_DATE=Local Build

GIT_COMMIT=Local
```

---

# Available API Endpoints

## Home

```
GET /
```

---

## Company

```
GET /company
```

---

## Health

```
GET /health
```

Returns

- Status
- Environment
- Version
- Uptime
- Memory Usage
- Timestamp

---

## Version

```
GET /version
```

Returns

- Version
- Environment
- Build Date
- Commit SHA

---

## Info

```
GET /info
```

Returns

- Application information
- Builder
- Assessment details

---

# Running With Docker

From the project root.

```bash
docker compose up -d
```

Verify containers.

```bash
docker compose ps
```

Example output

```
backend

frontend

nginx
```

---

# Viewing Logs

Backend logs

```bash
docker compose logs backend
```

Frontend logs

```bash
docker compose logs frontend
```

Nginx logs

```bash
docker compose logs nginx
```

All logs

```bash
docker compose logs -f
```

---

# Stop Containers

```bash
docker compose down
```

---

# Rebuild Containers

```bash
docker compose up -d --build
```

---

# Verify Services

Visit

```
http://localhost
```

Then test

```
http://localhost/api/health
```

```
http://localhost/api/company
```

```
http://localhost/api/version
```

---

# Development Workflow

Typical workflow:

1. Pull latest changes

```bash
git pull
```

2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make changes

4. Test locally

5. Commit changes

```bash
git add .

git commit -m "Add new feature"
```

6. Push changes

```bash
git push origin feature/new-feature
```

---

# Common Commands

Install packages

```bash
npm install
```

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

Docker

```bash
docker compose up -d
```

Stop Docker

```bash
docker compose down
```

View logs

```bash
docker compose logs -f
```

---

# Troubleshooting

## Docker Containers Not Starting

Check logs.

```bash
docker compose logs
```

---

## Frontend Cannot Reach Backend

Verify:

```
/api
```

is being used instead of

```
http://localhost:5000
```

when using Nginx.

---

## Backend Not Responding

Check

```bash
docker compose ps
```

Ensure the backend container is healthy.

---

## Port Already In Use

Find the process.

Linux

```bash
sudo lsof -i :80
```

Windows

```powershell
netstat -ano | findstr :80
```

---

## Container Changes Not Reflected

Rebuild the images.

```bash
docker compose down

docker compose up -d --build
```

---

# Development Best Practices

- Keep frontend and backend independent.
- Use Docker for production simulation.
- Avoid hardcoding API URLs.
- Commit frequently with descriptive messages.
- Verify the health endpoint before deployment.
- Keep environment-specific configuration outside the source code.

---

# Summary

You should now be able to:

- Clone the repository
- Install dependencies
- Run the backend
- Run the frontend
- Start Docker Compose
- Test API endpoints
- Debug common issues
- Contribute to the project