# Troubleshooting Guide

## Overview

This document records the major issues encountered during the development and deployment of the Peerless DevOps Engineering Showcase.

Rather than simply listing solutions, it documents:

- Symptoms
- Root cause analysis
- Resolution
- Lessons learned

Maintaining this record demonstrates systematic debugging, problem-solving skills, and an understanding of the technologies used throughout the project.

---

# Issue 1 – Frontend Displayed a White Screen

## Symptoms

After starting the frontend application, the browser displayed a completely blank page.

No UI components rendered.

---

## Investigation

The browser developer console showed that the application was failing before React could render.

Further inspection revealed that API requests were failing during application startup.

The application waited for company data before rendering the page.

---

## Root Cause

Axios was attempting to call an invalid API endpoint due to incorrect configuration.

The frontend could not retrieve the required company information.

---

## Resolution

Updated the Axios configuration to use the correct API base URL.

Development:

```typescript
baseURL: "http://localhost:5000"
```

Production:

```typescript
baseURL: "/api"
```

---

## Lessons Learned

Always verify API requests using the browser's Network tab before assuming a frontend rendering issue.

---

# Issue 2 – API Requests Targeted localhost in Production

## Symptoms

The deployed frontend attempted to access:

```
http://localhost:5000/company
```

instead of the production backend.

---

## Root Cause

The frontend had been built using development environment variables.

Since React applications are statically built, environment variables are embedded during build time.

---

## Resolution

Configured the frontend to use relative API paths.

```typescript
baseURL: "/api"
```

Nginx now routes API requests appropriately.

---

## Lessons Learned

Never hardcode localhost inside production builds.

---

# Issue 3 – Duplicate /api Prefix

## Symptoms

Browser requests appeared as:

```
/api/api/company
```

Resulting in:

```
404 Not Found
```

---

## Root Cause

Axios already prefixed requests with:

```
/api
```

The application then requested:

```typescript
api.get("/api/company")
```

creating:

```
/api/api/company
```

---

## Resolution

Changed API requests to:

```typescript
api.get("/company")
```

---

## Lessons Learned

Only one component should be responsible for prefixing API routes.

---

# Issue 4 – Backend Was Reachable but Frontend Displayed "Unable to Load Data"

## Symptoms

Backend endpoints worked correctly.

```
curl http://localhost/api/company
```

returned valid JSON.

However, the React application still displayed:

```
Unable to load application data.
```

---

## Root Cause

Frontend requests still referenced an outdated API path after deployment.

---

## Resolution

Rebuilt the frontend Docker image and pushed a fresh version to GitHub Container Registry.

Updated the production containers.

---

## Lessons Learned

Whenever frontend configuration changes, rebuild the image before deployment.

---

# Issue 5 – Nginx Container Failed to Start

## Symptoms

Docker returned:

```
Are you trying to mount a directory onto a file?
```

---

## Root Cause

The following file did not exist:

```
nginx/nginx.conf
```

Docker attempted to mount a directory onto a file path.

---

## Resolution

Created:

```
nginx/
```

Added:

```
nginx.conf
```

Mounted it correctly.

```yaml
volumes:
  - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
```

---

## Lessons Learned

Verify that host paths exist before mounting volumes.

---

# Issue 6 – Docker Compose Started Only Two Containers

## Symptoms

Only:

```
backend

frontend
```

appeared after running:

```bash
docker compose up
```

---

## Root Cause

The compose file did not include the Nginx service.

---

## Resolution

Added:

```yaml
nginx:
```

Configured networking and restarted the stack.

---

## Lessons Learned

Always verify running services using:

```bash
docker compose ps
```

---

# Issue 7 – Backend Not Accessible on localhost:5000

## Symptoms

```
curl http://localhost:5000/health
```

returned:

```
Connection refused
```

---

## Root Cause

After introducing Nginx, the backend was intentionally no longer exposed publicly.

---

## Resolution

Accessed the backend through:

```
http://localhost/api/health
```

instead.

---

## Lessons Learned

Reverse proxies become the public entry point.

---

# Issue 8 – Docker Compose Warning

## Symptoms

Docker displayed:

```
the attribute "version" is obsolete
```

---

## Root Cause

Docker Compose V2 no longer requires the version field.

---

## Resolution

Removed:

```yaml
version: "3.9"
```

---

## Lessons Learned

Keep Compose files aligned with current Docker standards.

---

# Issue 9 – GitHub Actions YAML Validation Failed

## Symptoms

GitHub reported multiple YAML parsing errors.

Example:

```
Unexpected flow-map-end token
```

---

## Root Cause

Incorrect indentation and misplaced braces inside the workflow file.

YAML is indentation-sensitive.

---

## Resolution

Reformatted the workflow.

Validated using:

- VS Code YAML extension
- GitHub Actions validator

---

## Lessons Learned

Always validate workflow syntax before pushing.

---

# Issue 10 – Build Metadata Not Displaying

## Symptoms

The application displayed:

```
Version

Environment
```

but Build Date remained empty.

---

## Root Cause

The Docker image received only APP_VERSION.

BUILD_DATE was never injected.

---

## Resolution

Added:

```dockerfile
ARG BUILD_DATE

ENV BUILD_DATE=$BUILD_DATE
```

Updated GitHub Actions:

```yaml
--build-arg BUILD_DATE="$BUILD_DATE"
```

---

## Lessons Learned

Docker ARG values are unavailable unless explicitly converted into ENV variables.

---

# Issue 11 – Memory Usage Displayed in Bytes

## Symptoms

API returned:

```
7429172
```

instead of a human-readable value.

---

## Root Cause

Node.js reports memory usage in bytes.

---

## Resolution

Converted bytes to megabytes.

```javascript
const memoryUsageMB = (
    process.memoryUsage().heapUsed /
    1024 /
    1024
).toFixed(2);
```

API response:

```json
{
    "memoryUsageMB": "7.08 MB"
}
```

---

## Lessons Learned

Always expose operational metrics in a readable format.

---

# Issue 12 – GitHub Container Registry Images Not Updating

## Symptoms

The production server continued using older application versions.

---

## Root Cause

New images had been pushed to GHCR, but the server had not pulled them.

---

## Resolution

Executed:

```bash
docker compose pull

docker compose up -d
```

---

## Lessons Learned

Publishing new images does not automatically update running containers.

---

# Issue 13 – Docker Compose Networking

## Symptoms

Uncertainty about how containers communicated without exposing backend ports.

---

## Investigation

Executed:

```bash
docker network inspect peerless_default
```

Verified all services belonged to the same bridge network.

---

## Resolution

Configured Nginx to communicate using Docker service names.

```nginx
proxy_pass http://backend:5000;
```

---

## Lessons Learned

Docker Compose provides automatic DNS resolution between services.

---

# Key Debugging Techniques Used

Throughout the project, the following troubleshooting tools were used extensively:

## Browser

- Developer Tools
- Network Tab
- Console
- Request Inspection

---

## Docker

```bash
docker ps

docker images

docker logs

docker compose ps

docker compose logs

docker exec
```

---

## Linux

```bash
curl

wget

cat

ls

nano

pwd
```

---

## GitHub

- GitHub Actions Logs
- Workflow Validation
- Container Registry
- Package Management

---

# Summary

Developing this project involved resolving issues related to React configuration, Docker containerization, Nginx reverse proxying, GitHub Actions automation, Docker networking, and production deployment.

Each challenge strengthened the deployment architecture while reinforcing key DevOps practices such as observability, debugging, reproducibility, and automation. The documented resolutions provide a practical reference for future maintenance and demonstrate a structured approach to diagnosing and solving infrastructure and application issues.