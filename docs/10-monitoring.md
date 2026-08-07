# Monitoring & Health Endpoints

## Overview

The Peerless DevOps Engineering Showcase includes several monitoring endpoints that provide real-time information about the application's operational state.

These endpoints are designed to support:

- Health monitoring
- Runtime diagnostics
- Deployment verification
- Version tracking
- Operational visibility

They can be queried manually using tools such as `curl` or integrated into external monitoring platforms and load balancers.

---

# Monitoring Architecture

```
                   Browser

                      │

                      ▼

                  Nginx

                      │

                      ▼

                 Express API

                      │

        ┌─────────────┼─────────────┐

        ▼             ▼             ▼

   /health        /version       /info
```

Each endpoint provides specific operational information about the running application.

---

# Available Endpoints

| Endpoint | Purpose |
|----------|----------|
| `/api/health` | Runtime health information |
| `/api/version` | Build metadata |
| `/api/info` | Application information |
| `/api/company` | Company data consumed by the frontend |

---

# Health Endpoint

```
GET /api/health
```

This endpoint provides live runtime information about the backend service.

Example response:

```json
{
    "status": "healthy",
    "service": "Peerless DevOps Showcase API",
    "version": "4f29ac1",
    "environment": "production",
    "uptime": "523 seconds",
    "timestamp": "2026-08-07T10:15:00Z",
    "nodeVersion": "v22.23.2",
    "memoryUsage": 7429172,
    "memoryUsageMB": "7.09 MB"
}
```

---

# Health Response Fields

## Status

```
healthy
```

Indicates whether the application is responding correctly.

Possible future values:

- healthy
- degraded
- unhealthy

---

## Service

Returns the application name.

Example:

```
Peerless DevOps Showcase API
```

---

## Version

Displays the application version generated during the CI pipeline.

Example:

```
4f29ac1
```

This value corresponds to the Git commit SHA used to build the Docker image.

---

## Environment

Indicates the deployment environment.

Example:

```
production
```

Possible environments include:

- development
- staging
- production

---

## Uptime

Shows how long the application has been running since startup.

Example:

```
523 seconds
```

The frontend converts this value into minutes for improved readability.

---

## Timestamp

Provides the exact UTC time the health check was generated.

Example:

```
2026-08-07T10:15:00Z
```

This confirms the API is returning live data.

---

## Node Version

Displays the Node.js runtime version.

Example:

```
v22.23.2
```

Useful for debugging runtime compatibility issues.

---

## Memory Usage

Reports the application's current heap memory usage.

Raw bytes:

```
7429172
```

Human-readable value:

```
7.09 MB
```

Displaying memory in megabytes makes runtime monitoring easier for operators.

---

# Version Endpoint

```
GET /api/version
```

This endpoint exposes deployment metadata injected during the CI pipeline.

Example response:

```json
{
    "app": "Peerless DevOps Showcase",
    "version": "4f29ac1",
    "environment": "production",
    "buildDate": "2026-08-07T06:30:14Z",
    "commit": "4f29ac1"
}
```

---

# Version Fields

## Application

Application name.

---

## Version

Current application version.

Generated automatically during GitHub Actions.

---

## Environment

Current deployment environment.

---

## Build Date

UTC timestamp indicating when the Docker image was built.

Automatically injected into the Docker image during the CI workflow.

---

## Commit

Git commit used to build the running container.

This makes every deployment traceable to a specific source code revision.

---

# Information Endpoint

```
GET /api/info
```

Provides descriptive information about the project.

Example response:

```json
{
    "application": "Peerless DevOps Showcase",
    "builder": "Agbabiaka Hammed",
    "assessment": "Peerless DevOps Engineer Assessment",
    "description": "A production-inspired demonstration application showcasing containerization, CI/CD, health monitoring, secure configuration, and deployment automation."
}
```

This endpoint is primarily informational and useful for verifying the deployed application.

---

# Company Endpoint

```
GET /api/company
```

Returns the company information displayed by the frontend.

The React application retrieves this data during startup using Axios.

---

# Monitoring Workflow

A typical monitoring request follows this flow:

```
Browser

      │

GET /api/health

      │

      ▼

Nginx Reverse Proxy

      │

      ▼

Express Backend

      │

Generate Runtime Metrics

      │

      ▼

JSON Response

      │

      ▼

Browser / Monitoring Tool
```

---

# Manual Health Checks

Health endpoints can be tested using `curl`.

```bash
curl http://localhost/api/health
```

Version information:

```bash
curl http://localhost/api/version
```

Application information:

```bash
curl http://localhost/api/info
```

---

# Frontend Monitoring

The React frontend periodically retrieves runtime information using the custom hook:

```
useSystemStatus()
```

Displayed metrics include:

- API Health
- Environment
- Version
- Uptime
- Last Updated
- Build Date

This provides users with a simple operational dashboard.

---

# Why Monitoring Matters

Monitoring enables operators to:

- Detect application failures
- Verify deployments
- Confirm build versions
- Track runtime health
- Monitor memory usage
- Validate environment configuration

Without monitoring, diagnosing production issues becomes significantly more difficult.

---

# Current Monitoring Capabilities

The application currently exposes:

✅ Runtime health

✅ Version information

✅ Build metadata

✅ Environment

✅ Memory usage

✅ Uptime

✅ Node.js version

✅ API availability

---

# Future Monitoring Improvements

Potential enhancements include:

## Prometheus

Expose metrics in Prometheus format for automated scraping.

---

## Grafana

Create dashboards to visualize:

- Memory usage
- Uptime
- Request rate
- CPU utilization

---

## Health Checks

Configure Docker health checks.

Example:

```dockerfile
HEALTHCHECK CMD wget --spider http://localhost:5000/health || exit 1
```

---

## Alerting

Integrate with:

- Grafana Alerting
- PagerDuty
- Slack
- Microsoft Teams

to notify operators of failures.

---

## Logging

Forward application logs to centralized platforms such as:

- Elasticsearch
- Loki
- Cloud Logging

---

## Metrics

Additional runtime metrics could include:

- CPU utilization
- Active requests
- Response latency
- Error rate
- Container restart count

---

# Best Practices Followed

This project implements several monitoring best practices:

- Dedicated health endpoint
- Runtime metadata exposure
- Build version tracking
- Human-readable operational metrics
- Environment identification
- Deployment traceability
- Simple JSON responses suitable for automation

---

# Summary

The Peerless DevOps Engineering Showcase provides lightweight but effective operational monitoring through dedicated REST endpoints. These endpoints expose runtime health, deployment metadata, memory usage, uptime, and version information, enabling quick verification of application status and supporting future integration with enterprise monitoring platforms.