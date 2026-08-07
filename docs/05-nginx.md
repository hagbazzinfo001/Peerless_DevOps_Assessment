# Nginx Reverse Proxy Guide

## Overview

The Peerless DevOps Engineering Showcase uses **Nginx** as a reverse proxy to provide a single public entry point for the application.

Instead of exposing both the frontend and backend independently, all incoming HTTP requests are first received by Nginx. Based on the requested URL, Nginx decides whether the request should be forwarded to the frontend or the backend service.

This architecture closely resembles production deployments where reverse proxies are responsible for routing traffic, improving security, and simplifying application access.

---

# Why Nginx?

Without a reverse proxy, users would need to know multiple service endpoints.

Example:

Frontend

```
http://server-ip:80
```

Backend

```
http://server-ip:5000
```

This approach is difficult to maintain and exposes unnecessary services to the public.

By introducing Nginx, users only need a single URL:

```
http://server-ip
```

Nginx transparently routes requests to the correct container.

Benefits include:

- Single public endpoint
- Simplified networking
- Reverse proxy functionality
- Better security
- Cleaner API routing
- Production-ready architecture

---

# Request Flow

The following diagram illustrates the request lifecycle.

```
                Browser

                    │

        GET /api/company

                    │

                    ▼

               Nginx

                    │

       proxy_pass backend

                    │

                    ▼

         Express Backend

                    │

           JSON Response

                    │

                    ▼

               Nginx

                    │

                    ▼

              React Browser
```

---

# Container Communication

Docker Compose creates an internal bridge network where containers communicate using service names.

```
peerless_default

│

├── nginx

├── frontend

└── backend
```

Instead of using IP addresses, Nginx communicates with services using:

```
frontend
```

and

```
backend
```

This makes the configuration independent of container IP addresses.

---

# Nginx Configuration

The project uses the following configuration:

```nginx
events {}

http {

    server {

        listen 80;

        location / {

            proxy_pass http://frontend:80;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;

        }

        location /api/ {

            proxy_pass http://backend:5000/;

            proxy_http_version 1.1;

            proxy_set_header Host $host;

            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        }

    }

}
```

---

# Configuration Breakdown

## events {}

The `events` block defines how Nginx manages client connections.

For this project, the default configuration is sufficient.

---

## http {}

The `http` block contains all HTTP server configurations.

It acts as the root configuration for web traffic.

---

## server {}

The server block defines a virtual server listening for HTTP requests.

```nginx
listen 80;
```

Nginx listens on port **80**, making it the public entry point into the application.

---

# Frontend Route

```nginx
location / {

    proxy_pass http://frontend:80;

}
```

Requests matching `/` are forwarded to the React frontend container.

Example:

```
GET /
```

becomes

```
frontend:80
```

This serves the React application to the user's browser.

---

# Backend Route

```nginx
location /api/ {

    proxy_pass http://backend:5000/;

}
```

Requests beginning with `/api` are forwarded to the backend container.

Example:

```
GET /api/company
```

becomes

```
GET backend:5000/company
```

The `/api` prefix is removed before forwarding because of the trailing slash in the `proxy_pass` directive.

This allows the backend to expose routes such as:

```
/company
```

instead of

```
/api/company
```

---

# Request Headers

The configuration forwards important HTTP headers.

## Host Header

```nginx
proxy_set_header Host $host;
```

Preserves the original host requested by the client.

---

## Client IP

```nginx
proxy_set_header X-Real-IP $remote_addr;
```

Passes the client's IP address to the backend application.

---

## Forwarded For

```nginx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

Maintains the complete chain of proxy IP addresses.

This is useful for:

- Logging
- Analytics
- Security auditing

---

# Frontend API Calls

The React application uses relative URLs.

Example:

```typescript
api.get("/company")
```

Axios is configured with:

```typescript
baseURL: "/api"
```

Resulting request:

```
/api/company
```

Nginx forwards this to:

```
backend:5000/company
```

This design allows the same frontend build to work in production without changing environment variables.

---

# Security Benefits

Using Nginx provides several security advantages.

## Backend Isolation

The backend container is **not directly exposed** to the internet.

Only Nginx is publicly accessible.

---

## Single Entry Point

Users interact with only one exposed port.

```
80
```

This reduces the attack surface.

---

## Internal Networking

Frontend and backend containers communicate only through Docker's private network.

No external routing is required.

---

# Docker Compose Integration

The Docker Compose configuration includes:

```yaml
services:

  backend:

  frontend:

  nginx:
```

Only Nginx publishes a host port.

Example:

```yaml
ports:

  - "80:80"
```

Backend and frontend remain internal services.

---

# Typical Request Examples

## Load Homepage

```
GET /
```

↓

```
frontend
```

---

## Company Information

```
GET /api/company
```

↓

```
backend
```

---

## Health Status

```
GET /api/health
```

↓

```
backend
```

---

## Version Information

```
GET /api/version
```

↓

```
backend
```

---

# Troubleshooting

## 404 Errors

Verify the frontend is requesting:

```
/api/company
```

and **not**

```
/api/api/company
```

---

## Backend Not Reachable

Verify Docker networking:

```bash
docker compose ps
```

Check logs:

```bash
docker compose logs nginx

docker compose logs backend
```

---

## Nginx Configuration

Validate the configuration.

```bash
docker exec -it peerless-nginx-1 nginx -t
```

Expected output:

```
configuration file is valid
```

---

## Test API Routing

Run:

```bash
curl http://localhost/api/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

---

# Production Benefits

Using Nginx provides:

- Clean URL structure
- Reverse proxy capabilities
- Improved security
- Centralized routing
- Easier scaling
- Better maintainability

In larger environments, additional Nginx features such as HTTPS termination, load balancing, rate limiting, compression, and caching can be added without modifying the application itself.

---

# Summary

Nginx acts as the gateway for all incoming traffic, routing requests to the appropriate frontend or backend service while keeping internal containers isolated from direct public access.

This architecture reflects common production deployment patterns and demonstrates a practical understanding of reverse proxies, container networking, and infrastructure design.