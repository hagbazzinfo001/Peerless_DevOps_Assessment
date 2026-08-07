# Docker Guide

## Overview

Docker is the foundation of this project's deployment strategy. Instead of installing application dependencies directly on a server, each service is packaged into an isolated, portable container.

This approach ensures that the application behaves consistently across development, testing, and production environments.

The project uses Docker to containerize both the frontend and backend applications, while Docker Compose orchestrates the complete multi-container environment.

---

# Why Docker?

Traditional deployments often suffer from the classic "works on my machine" problem due to differences in operating systems, runtime versions, and installed dependencies.

Docker solves these issues by packaging the application together with everything it needs to run.

Benefits include:

- Consistent environments
- Easy deployment
- Application isolation
- Portability
- Scalability
- Simplified dependency management

---

# Container Architecture

The application consists of three independent containers.

```
                    Docker Host

                         │

         ┌───────────────┼────────────────┐
         │               │                │

         ▼               ▼                ▼

    Frontend        Backend           Nginx
     React           Express      Reverse Proxy

```

Each container has a single responsibility, following the microservices principle of separation of concerns.

---

# Frontend Docker Image

The frontend uses a **multi-stage build** to reduce image size and improve security.

## Build Stage

The first stage installs dependencies and compiles the React application.

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
```

### Responsibilities

- Install dependencies
- Compile React
- Produce optimized production assets

---

## Production Stage

The second stage serves the compiled application using Nginx.

```dockerfile
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Why Multi-Stage Builds?

Using multiple stages keeps the production image lightweight because development dependencies are excluded from the final image.

Advantages:

- Smaller image size
- Faster deployments
- Reduced attack surface
- Improved startup performance

---

# Backend Docker Image

The backend image packages the Express application together with its runtime dependencies.

```dockerfile
FROM node:22-alpine

ARG BUILD_DATE
ARG APP_VERSION

ENV BUILD_DATE=$BUILD_DATE
ENV APP_VERSION=$APP_VERSION

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

---

# Build Arguments

The backend image receives build-time metadata from the CI/CD pipeline.

| Argument | Purpose |
|----------|---------|
| BUILD_DATE | Records when the image was built |
| APP_VERSION | Stores the application version (Git commit SHA) |

These values are injected automatically during the GitHub Actions workflow and exposed through the application's API.

---

# Runtime Environment Variables

At runtime, the application exposes metadata such as:

- Application name
- Environment
- Version
- Build date
- Commit SHA

This enables the frontend to display deployment information without hardcoding values.

---

# Docker Compose

Docker Compose orchestrates all services required by the application.

The stack consists of:

- Frontend
- Backend
- Nginx

Each service is defined in a single `docker-compose.yml` file.

Example structure:

```yaml
services:
  frontend:
    image: ghcr.io/<username>/peerless-frontend:latest

  backend:
    image: ghcr.io/<username>/peerless-backend:latest

  nginx:
    image: nginx:alpine
```

---

# Docker Network

Docker Compose automatically creates a private bridge network.

```
peerless_default

│

├── frontend

├── backend

└── nginx
```

Containers communicate using service names instead of IP addresses.

For example:

```nginx
proxy_pass http://backend:5000;
```

Docker resolves `backend` to the correct container automatically.

---

# Exposed Ports

| Service | Internal Port | External Port |
|----------|--------------:|--------------:|
| Frontend | 80 | Internal only |
| Backend | 5000 | Internal only |
| Nginx | 80 | 80 |

Only Nginx is exposed publicly.

This improves security by preventing direct access to the application containers.

---

# Building Images

## Backend

```bash
docker build -t peerless-backend ./backend
```

---

## Frontend

```bash
docker build -t peerless-frontend ./frontend
```

---

# Running the Application

Start all services:

```bash
docker compose up -d
```

Verify containers:

```bash
docker compose ps
```

Expected output:

```
backend

frontend

nginx
```

---

# Viewing Logs

All logs:

```bash
docker compose logs -f
```

Backend only:

```bash
docker compose logs backend
```

Frontend only:

```bash
docker compose logs frontend
```

Nginx only:

```bash
docker compose logs nginx
```

---

# Stopping the Stack

```bash
docker compose down
```

---

# Rebuilding Images

Whenever source code changes affect the container image:

```bash
docker compose up -d --build
```

---

# Image Versioning

The GitHub Actions workflow publishes two tags for each image.

Example:

```
peerless-backend:latest

peerless-backend:abc1234
```

The `latest` tag always points to the newest build, while the commit SHA tag provides immutable versioning for rollback and traceability.

---

# Image Storage

Built images are published to GitHub Container Registry (GHCR).

Repository:

```
ghcr.io/<username>/peerless-backend

ghcr.io/<username>/peerless-frontend
```

The production server pulls these images directly from GHCR during deployment.

---

# Benefits of the Docker-Based Approach

- Consistent environments
- Simplified deployments
- Easy rollback using image tags
- Service isolation
- Lightweight production images
- Improved portability
- Infrastructure reproducibility

---

# Best Practices Followed

- Used lightweight Alpine Linux base images.
- Used multi-stage builds for the frontend.
- Avoided unnecessary packages in production images.
- Injected build metadata through CI/CD.
- Exposed only the required ports.
- Used Docker Compose for orchestration.
- Stored images in GitHub Container Registry.
- Used immutable image tags based on Git commit SHA.

---

# Summary

Docker forms the foundation of the deployment workflow by packaging the frontend and backend into reproducible, portable containers. Combined with Docker Compose, GitHub Actions, and GitHub Container Registry, the project demonstrates a complete container-based deployment pipeline suitable for modern DevOps practices.