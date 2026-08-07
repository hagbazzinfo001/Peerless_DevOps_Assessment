# System Architecture

## Overview

The Peerless DevOps Engineering Showcase follows a modern three-tier architecture that separates concerns between the presentation layer, application layer, and infrastructure layer.

Rather than exposing multiple services directly to users, all incoming traffic is routed through an Nginx reverse proxy, which acts as the single entry point into the application.

This design closely mirrors production environments where reverse proxies handle routing, security, and traffic management.

---

# High-Level Architecture

```

```
                           Internet
                               │
                               │
                        HTTP Requests
                               │
                               ▼
                  Google Cloud Virtual Machine
                               │
                               ▼
                     Docker Compose Network
                               │
                               ▼
                     ┌──────────────────┐
                     │      NGINX       │
                     │ Reverse Proxy    │
                     └────────┬─────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
        React Frontend             Express Backend
        (Container)                (Container)
                 │                         │
                 └────────────┬────────────┘
                              │
                       Docker Network
```

```

---

# Architecture Layers

The application consists of four logical layers.

## 1. Client Layer

The client layer consists of users accessing the application through a modern web browser.

Responsibilities include:

- Rendering the React application
- Requesting backend APIs
- Displaying live deployment information
- Displaying health monitoring information

Users never communicate directly with the backend.

All requests pass through Nginx.

---

## 2. Reverse Proxy Layer

Nginx serves as the gateway into the application.

Responsibilities include:

- Serving the React frontend
- Routing API requests
- Forwarding requests to backend services
- Simplifying network configuration
- Providing a single public endpoint

Without Nginx:

```

Browser
↓
Frontend → localhost:80

Backend → localhost:5000

```

Users would need to know multiple ports.

With Nginx:

```

Browser
↓

http://server-ip

↓

Nginx

↓

Frontend

Backend

```

Everything becomes accessible through a single URL.

---

## 3. Application Layer

The application layer consists of two independent Docker containers.

### Frontend Container

Technology Stack

- React
- TypeScript
- Axios
- Nginx (inside the container)

Responsibilities

- User interface
- API requests
- Company information
- System status dashboard
- Deployment overview

---

### Backend Container

Technology Stack

- Node.js
- Express

Responsibilities

- REST API
- Health endpoint
- Version endpoint
- Company endpoint
- Runtime information

---

## 4. Infrastructure Layer

Infrastructure consists of

- Docker
- Docker Compose
- GitHub Container Registry
- GitHub Actions
- Google Cloud VM

Responsibilities

- Running containers
- Managing networks
- Image deployment
- Continuous Integration
- Production hosting

---

# Request Flow

A request to view company information follows the sequence below.

```

Browser

│

GET /api/company

│

▼

NGINX

│

proxy_pass

│

▼

Backend Container

│

Express Route

│

▼

Controller

│

JSON Response

│

▼

NGINX

│

▼

Browser

```

---

# Docker Architecture

Each service runs independently.

```

Docker Host

│

├── frontend

│

├── backend

│

└── nginx

```

Benefits include

- Isolation
- Independent deployment
- Independent updates
- Better scalability
- Easier debugging

---

# Docker Networking

Docker Compose automatically creates an internal network.

```

peerless_default

│

├── frontend

├── backend

└── nginx

```

Containers communicate using service names instead of IP addresses.

Example

```

proxy_pass http://backend:5000;

```

instead of

```

http://192.168.x.x

```

This removes the need to manage changing IP addresses.

---

# Reverse Proxy Configuration

Nginx exposes two routes.

## Frontend

```

/

↓

frontend:80

```

All browser requests load the React application.

---

## Backend

```

/api/*

↓

backend:5000

```

API requests are transparently forwarded.

Example

Browser

```

GET /api/health

```

becomes

```

GET backend:5000/health

```

---

# CI/CD Architecture

Deployment begins when code is pushed to GitHub.

```

Developer

│

git push

│

▼

GitHub

│

▼

GitHub Actions

│

├── Install Dependencies

├── Run Tests

├── Build React

├── Build Docker Images

├── Tag Images

└── Push Images

↓

GitHub Container Registry

↓

Google Cloud VM

↓

docker compose pull

↓

docker compose up -d

```

---

# Container Registry Architecture

Docker images are published to GitHub Container Registry.

```

GitHub Actions

↓

Build Image

↓

Tag latest

↓

Tag commit SHA

↓

Push

↓

GHCR

↓

Production Server

↓

docker compose pull

```

Advantages

- Centralized storage
- Version history
- Easy rollback
- Secure authentication

---

# Runtime Monitoring

The backend exposes operational metadata.

| Endpoint | Purpose |
|-----------|----------|
| /health | Service health |
| /version | Version information |
| /info | Application metadata |
| /company | Business information |

---

# Runtime Metadata

The API provides

- Application Version
- Environment
- Build Date
- Commit SHA
- Node.js Version
- Memory Usage
- Uptime
- Timestamp

These values are automatically injected during the GitHub Actions build process.

---

# Network Ports

| Service | Internal Port | External Port |
|----------|--------------:|--------------:|
| Frontend | 80 | Internal only (via Nginx) |
| Backend | 5000 | Internal only (via Nginx) |
| Nginx | 80 | 80 |

Only Nginx is publicly exposed.

This improves security by preventing direct access to the frontend and backend containers.

---

# Security Considerations

Several production-inspired security practices were adopted.

## Reverse Proxy Isolation

Backend services are not directly exposed to the internet.

---

## Container Isolation

Each application component runs in its own container.

---

## Environment Variables

Build metadata and runtime configuration are injected during the build process instead of being hardcoded.

---

## Immutable Images

Docker images are built once and deployed without modification, ensuring consistency between environments.

---

# Design Decisions

## Why Docker?

Docker guarantees that the application behaves consistently across development, testing, and production environments.

---

## Why Docker Compose?

Docker Compose simplifies multi-container management and networking.

---

## Why Nginx?

Nginx provides a single public entry point, reverse proxy capabilities, and cleaner API routing.

---

## Why GitHub Container Registry?

GHCR integrates directly with GitHub Actions, making automated image publishing simple and secure.

---

## Why Google Cloud VM?

Google Cloud provides an inexpensive Linux environment suitable for demonstrating production deployment without requiring Kubernetes.

---

# Summary

The architecture emphasizes simplicity, maintainability, and production readiness while showcasing essential DevOps practices.

The combination of Docker, Docker Compose, Nginx, GitHub Actions, GitHub Container Registry, and Google Cloud demonstrates a complete container-based deployment workflow that closely resembles modern software delivery pipelines.