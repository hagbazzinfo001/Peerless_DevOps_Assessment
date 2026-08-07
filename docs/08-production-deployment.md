# Production Deployment Guide

## Overview

This document provides a complete walkthrough for deploying the Peerless DevOps Engineering Showcase to a production server hosted on **Google Cloud Platform (GCP)**.

The deployment uses:

- Google Compute Engine Virtual Machine
- Ubuntu Linux
- Docker
- Docker Compose
- Nginx Reverse Proxy
- GitHub Actions
- GitHub Container Registry (GHCR)

Unlike traditional deployments where applications are built directly on the server, this project follows a modern container-based deployment workflow. Docker images are built and published automatically by GitHub Actions, while the production server simply pulls and runs those images.

---

# Deployment Architecture

```

                    GitHub

                      │

                 Git Push

                      │

                      ▼

               GitHub Actions

                      │

        Build Docker Images

                      │

                      ▼

         GitHub Container Registry

                      │

               docker compose pull

                      │

                      ▼

        Google Cloud Compute Engine

                      │

                      ▼

                 Docker Compose

          ┌──────────┼──────────┐

          ▼          ▼          ▼

      Frontend    Backend     Nginx

                      │

                      ▼

                  End Users

```

---

# Deployment Requirements

Before deployment, ensure the following are available:

- Google Cloud account
- Compute Engine enabled
- GitHub repository
- GitHub Container Registry packages
- Docker images successfully published
- SSH access to the VM

---

# Step 1 – Create a Virtual Machine

Navigate to:

```
Google Cloud Console

↓

Compute Engine

↓

VM Instances

↓

Create Instance
```

Recommended configuration:

| Setting | Value |
|----------|-------|
| Operating System | Ubuntu 24.04 LTS |
| Machine Type | e2-micro (or higher) |
| Boot Disk | 20 GB SSD |
| Region | Closest to users |
| Firewall | Allow HTTP Traffic |

---

# Step 2 – Configure Firewall

Allow inbound traffic on:

| Port | Purpose |
|-------|----------|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS (future use) |

Verify firewall rules from:

```
VPC Network

↓

Firewall
```

---

# Step 3 – Connect via SSH

Use the Google Cloud SSH console or your local terminal.

Example:

```bash
ssh username@VM_PUBLIC_IP
```

Verify connectivity.

```bash
hostname
```

---

# Step 4 – Update the System

```bash
sudo apt update

sudo apt upgrade -y
```

Keeping packages updated ensures the latest security patches are installed.

---

# Step 5 – Install Docker

Install Docker.

```bash
sudo apt install docker.io -y
```

Enable Docker.

```bash
sudo systemctl enable docker

sudo systemctl start docker
```

Verify installation.

```bash
docker --version
```

---

# Step 6 – Install Docker Compose

Install Docker Compose.

```bash
sudo apt install docker-compose-plugin -y
```

Verify.

```bash
docker compose version
```

---

# Step 7 – Configure Docker Permissions

Add the current user to the Docker group.

```bash
sudo usermod -aG docker $USER
```

Refresh the session.

```bash
newgrp docker
```

Verify.

```bash
docker ps
```

---

# Step 8 – Clone Repository

```bash
git clone https://github.com/<username>/peerless-devops-showcase.git
```

Navigate into the project.

```bash
cd peerless-devops-showcase
```

---

# Step 9 – Verify Docker Compose File

Ensure the compose file references images hosted in GitHub Container Registry.

Example:

```yaml
backend:
  image: ghcr.io/hagbazzinfo001/peerless-backend:latest

frontend:
  image: ghcr.io/hagbazzinfo001/peerless-frontend:latest

nginx:
  image: nginx:alpine
```

---

# Step 10 – Verify Nginx Configuration

Confirm the Nginx configuration exists.

```
nginx/nginx.conf
```

It should route:

```
/

↓

Frontend
```

and

```
/api/

↓

Backend
```

---

# Step 11 – Pull Images

Download the latest images.

```bash
docker compose pull
```

Verify.

```bash
docker images
```

---

# Step 12 – Start the Application

Launch all containers.

```bash
docker compose up -d
```

Verify.

```bash
docker compose ps
```

Expected services:

```
backend

frontend

nginx
```

---

# Step 13 – Verify Backend

Test the health endpoint.

```bash
curl http://localhost/api/health
```

Expected response:

```json
{
  "status":"healthy"
}
```

---

# Step 14 – Verify Company Endpoint

```bash
curl http://localhost/api/company
```

Ensure company information is returned successfully.

---

# Step 15 – Access the Application

Open the browser.

```
http://VM_PUBLIC_IP
```

The React application should load successfully.

---

# Deployment Verification Checklist

Verify the following:

✅ Homepage loads

✅ Company information displayed

✅ Health endpoint returns 200

✅ Version endpoint returns metadata

✅ Build date displayed

✅ Commit SHA displayed

✅ Memory usage displayed

✅ Environment displayed

---

# Updating the Application

When new code is pushed:

1. GitHub Actions builds new images.

2. Images are published to GHCR.

3. SSH into the VM.

```bash
cd peerless-devops-showcase
```

Pull new images.

```bash
docker compose pull
```

Restart services.

```bash
docker compose up -d
```

Deployment completed.

---

# Viewing Logs

View all logs.

```bash
docker compose logs -f
```

Backend.

```bash
docker compose logs backend
```

Frontend.

```bash
docker compose logs frontend
```

Nginx.

```bash
docker compose logs nginx
```

---

# Health Monitoring

Useful endpoints.

```
/api/health
```

Returns:

- Status
- Version
- Environment
- Memory Usage
- Uptime

---

```
/api/version
```

Returns:

- Build Date
- Commit SHA
- Version

---

```
/api/info
```

Returns:

- Builder
- Assessment
- Description

---

# Troubleshooting

## Docker Containers Not Starting

Check.

```bash
docker compose ps
```

Inspect logs.

```bash
docker compose logs
```

---

## API Returning 404

Ensure Axios uses:

```
/api
```

instead of:

```
http://localhost:5000
```

---

## Double /api Issue

Incorrect:

```
/api/api/company
```

Correct:

```
/api/company
```

---

## Nginx Mount Error

Ensure the configuration file exists.

```
nginx/nginx.conf
```

and that the volume maps a file to a file:

```yaml
volumes:
  - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
```

---

## Backend Not Reachable

Inside the Nginx container:

```bash
wget -qO- http://backend:5000/health
```

If this succeeds, Docker networking is functioning correctly.

---

## Validate Nginx Configuration

```bash
docker exec -it peerless-nginx-1 nginx -t
```

Expected:

```
configuration file is successful
```

---

## Verify Docker Network

```bash
docker network inspect peerless_default
```

Ensure all containers are attached.

---

# Security Recommendations

For production environments:

- Enable HTTPS using Let's Encrypt.
- Configure automatic certificate renewal.
- Restrict SSH access by IP.
- Disable password authentication.
- Use a firewall to expose only ports 80 and 443.
- Regularly update Docker images.
- Scan images for vulnerabilities before deployment.

---

# Future Improvements

Potential enhancements include:

- Automatic deployment after a successful CI build.
- Blue/Green deployment strategy.
- Rolling updates with zero downtime.
- Container health checks.
- Centralized logging (e.g., ELK or Loki).
- Metrics collection with Prometheus and Grafana.
- HTTPS termination using Nginx and Certbot.

---

# Summary

The application was successfully deployed to a Google Cloud Compute Engine virtual machine using Docker Compose and Nginx. GitHub Actions automates the build and publication of Docker images to GitHub Container Registry, while the production server retrieves and runs those images. This deployment demonstrates a production-inspired workflow that emphasizes automation, reproducibility, and maintainability while aligning with modern DevOps practices.