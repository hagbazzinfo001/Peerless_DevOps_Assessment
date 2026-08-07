# Project Overview

## Introduction

The **Peerless DevOps Engineering Showcase** is a production-inspired demonstration application developed as part of the Peerless Software Global Services DevOps Engineer Assessment.

The objective of this project is not only to develop a working web application but also to demonstrate the DevOps practices involved in building, packaging, deploying, monitoring, and maintaining modern cloud-native applications.

The project showcases how frontend and backend applications can be containerized, automated through CI/CD pipelines, published to a container registry, and deployed to a Linux virtual machine using Docker Compose and Nginx.

---

# Project Goals

This project was designed to demonstrate competency in the following areas:

- Linux administration
- Docker containerization
- Multi-container orchestration
- GitHub Actions CI/CD
- GitHub Container Registry
- Reverse proxy configuration
- Production deployment
- Health monitoring
- Runtime metadata
- Infrastructure documentation

---

# Business Scenario

Imagine a software company that needs a lightweight web application showcasing its services while following production deployment standards.

The requirements include:

- A modern frontend
- A REST API backend
- Automated build process
- Containerized deployment
- Reverse proxy
- Production monitoring
- Deployment automation

This project addresses those requirements using widely adopted DevOps tools and best practices.

---

# Solution Overview

The application consists of three primary services:

## Frontend

The frontend is built using React and TypeScript.

Responsibilities include:

- Displaying company information
- Showing technologies used
- Displaying deployment information
- Showing live system status
- Consuming backend APIs

---

## Backend

The backend is built using Express.js.

Responsibilities include:

- Serving company information
- Providing health monitoring
- Returning build metadata
- Returning runtime information
- Exposing REST APIs

---

## Reverse Proxy

Nginx sits in front of both services.

Responsibilities include:

- Serving the frontend
- Routing `/api/*` requests to the backend
- Simplifying client-side configuration
- Acting as the single public entry point

---

# High-Level Architecture

```
                Browser
                   │
                   │
             HTTP Requests
                   │
                   ▼
              Nginx Proxy
             /            \
            /              \
           ▼                ▼
 React Frontend       Express Backend
                           │
                           ▼
                   Runtime Information
```

---

# Core Technologies

| Category | Technology |
|----------|------------|
| Frontend | React |
| Backend | Node.js |
| Framework | Express |
| Language | TypeScript |
| Runtime | Node.js 22 |
| Proxy | Nginx |
| Containers | Docker |
| Orchestration | Docker Compose |
| CI/CD | GitHub Actions |
| Registry | GitHub Container Registry |
| Cloud | Google Cloud Compute Engine |
| Operating System | Ubuntu Linux |

---

# DevOps Practices Demonstrated

The project demonstrates several industry-standard DevOps practices.

## Infrastructure as Code

Infrastructure configuration is stored as code using:

- Dockerfiles
- Docker Compose
- Nginx configuration
- GitHub Actions workflow

---

## Continuous Integration

Every push to the main branch automatically:

- Checks out the repository
- Installs dependencies
- Executes backend tests
- Builds the frontend
- Generates build metadata
- Builds Docker images
- Publishes Docker images

---

## Containerization

Both frontend and backend are packaged into independent Docker images.

Benefits include:

- Environment consistency
- Simplified deployment
- Isolation
- Portability

---

## Reverse Proxy

Nginx provides:

- Centralized routing
- Cleaner URLs
- API proxying
- Service abstraction

---

## Monitoring

The backend exposes runtime information such as:

- Application status
- Environment
- Version
- Build date
- Commit SHA
- Memory usage
- Node.js version
- Uptime

---

# Deliverables

This repository includes:

- React frontend
- Express backend
- Dockerfiles
- Docker Compose configuration
- Nginx reverse proxy
- GitHub Actions workflow
- GitHub Container Registry integration
- Production deployment configuration
- Monitoring endpoints
- Comprehensive documentation

---

# Intended Audience

This documentation is intended for:

- Technical reviewers
- Hiring managers
- DevOps engineers
- Software engineers
- System administrators

---

# Project Outcome

The final solution demonstrates how a modern application can be:

- Developed
- Containerized
- Automated
- Versioned
- Published
- Deployed
- Monitored
- Documented

using widely adopted DevOps technologies and best practices.
