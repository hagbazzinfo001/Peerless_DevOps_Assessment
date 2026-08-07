# CI/CD Pipeline Guide

## Overview

The Peerless DevOps Engineering Showcase uses **GitHub Actions** to automate the Continuous Integration (CI) workflow.

Every change pushed to the repository automatically triggers a pipeline that:

- Checks out the source code
- Installs dependencies
- Runs backend tests
- Builds the frontend
- Builds Docker images
- Tags images with version information
- Pushes images to GitHub Container Registry (GHCR)

This automated workflow eliminates manual build steps and ensures every deployment is reproducible and consistent.

---

# What is CI/CD?

CI/CD stands for:

- **Continuous Integration (CI)** – Automatically build and validate code whenever changes are made.
- **Continuous Delivery (CD)** – Prepare validated builds so they can be deployed quickly and consistently.

This project currently implements a complete **Continuous Integration** pipeline and a deployment-ready workflow. Images produced by the pipeline can be deployed to a server using Docker Compose.

---

# Workflow Location

The pipeline is defined in:

```

.github/workflows/ci.yml

```

---

# Workflow Triggers

The workflow starts automatically when:

```yaml
on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main
```

This means the pipeline runs whenever:

- Code is pushed to the `main` branch.
- A Pull Request targeting `main` is created or updated.

---

# Pipeline Overview

The workflow performs the following steps:

```

Developer

│

git push

│

▼

GitHub Repository

│

▼

GitHub Actions

│

├── Checkout Repository

├── Generate Build Metadata

├── Setup Node.js

├── Install Backend Dependencies

├── Run Backend Tests

├── Install Frontend Dependencies

├── Build React Application

├── Login to GHCR

├── Build Backend Docker Image

├── Push Backend Image

├── Build Frontend Docker Image

├── Push Frontend Image

└── Build Summary

```

Each stage must complete successfully before the next stage begins.

---

# Pipeline Permissions

The workflow requests the following permissions:

```yaml
permissions:
  contents: read
  packages: write
```

### contents: read

Allows GitHub Actions to clone the repository.

### packages: write

Allows the workflow to push Docker images to GitHub Container Registry.

---

# Step 1 – Checkout Repository

```yaml
- name: Checkout Repository
  uses: actions/checkout@v4
```

This step downloads the repository source code into the GitHub Actions runner.

Without this step, the workflow would have no access to the project files.

---

# Step 2 – Generate Build Metadata

```yaml
echo "BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')" >> $GITHUB_ENV

echo "SHORT_SHA=${GITHUB_SHA::7}" >> $GITHUB_ENV
```

This step creates metadata used throughout the build process.

## BUILD_DATE

Stores the UTC timestamp when the build started.

Example:

```

2026-08-07T06:30:14Z

```

## SHORT_SHA

Extracts the first seven characters of the Git commit SHA.

Example:

```

4f29ac1

```

These values are later injected into the Docker images.

---

# Step 3 – Setup Node.js

```yaml
uses: actions/setup-node@v4
```

Node.js version:

```

22

```

The workflow also enables npm dependency caching.

Benefits include:

- Faster builds
- Reduced network downloads
- Improved pipeline performance

---

# Step 4 – Backend Installation

```yaml
working-directory: backend

npm ci
```

The backend dependencies are installed using:

```

npm ci

```

instead of

```

npm install

```

### Why npm ci?

`npm ci` provides:

- Faster installation
- Deterministic dependency versions
- Better reproducibility
- Uses package-lock.json exactly

---

# Step 5 – Backend Tests

```yaml
npm test --if-present
```

If tests exist, they are executed automatically.

If no tests are present, the workflow continues without failing.

This makes the pipeline future-proof.

---

# Step 6 – Frontend Installation

The frontend dependencies are installed using:

```

npm ci

```

This guarantees consistent dependency versions across every build.

---

# Step 7 – Build React

```yaml
npm run build
```

The React application is compiled into static production assets.

Output directory:

```

dist/

```

These assets are copied into the production Nginx image.

---

# Step 8 – Login to GitHub Container Registry

```yaml
uses: docker/login-action@v3
```

Authentication uses the automatically generated:

```

GITHUB_TOKEN

```

No personal access token is required.

---

# Step 9 – Build Backend Image

The backend image is built using Docker.

Build arguments include:

- APP_VERSION
- BUILD_DATE

These values become environment variables inside the container.

The workflow creates two tags.

Example:

```

peerless-backend:latest

peerless-backend:4f29ac1

```

---

# Step 10 – Push Backend Image

After building:

```bash
docker push
```

publishes the image to GitHub Container Registry.

---

# Step 11 – Build Frontend Image

The frontend image is built in the same way.

The workflow creates:

```

peerless-frontend:latest

peerless-frontend:4f29ac1

```

---

# Step 12 – Push Frontend Image

Both frontend image tags are uploaded to GHCR.

---

# Step 13 – Build Summary

The workflow prints useful information:

```

CI completed successfully

Version: 4f29ac1

Build Date: 2026-08-07T06:30:14Z

```

This makes build verification easier.

---

# Image Versioning Strategy

Every build produces two image tags.

## Latest

```

peerless-backend:latest

```

Always points to the newest build.

---

## Immutable Version

```

peerless-backend:4f29ac1

```

Represents a specific Git commit.

Advantages:

- Easy rollback
- Deployment traceability
- Version auditing

---

# Build Metadata Injection

GitHub Actions injects metadata into Docker images using build arguments.

```dockerfile
ARG BUILD_DATE

ARG APP_VERSION

ENV BUILD_DATE=$BUILD_DATE

ENV APP_VERSION=$APP_VERSION
```

These values become available inside the backend application.

Example API response:

```json
{
  "version": "4f29ac1",
  "buildDate": "2026-08-07T06:30:14Z"
}
```

---

# GitHub Container Registry

Images are stored in:

```

ghcr.io/<username>/peerless-backend

ghcr.io/<username>/peerless-frontend

```

This allows the production server to pull the latest images without rebuilding the application.

---

# Production Deployment Workflow

Deployment follows these steps:

```

Developer

↓

git push

↓

GitHub Actions

↓

Build Images

↓

Push Images to GHCR

↓

Production Server

↓

docker compose pull

↓

docker compose up -d

```

The production server never builds images itself.

Instead, it pulls pre-built images directly from GHCR.

---

# Benefits of the CI Pipeline

- Automated builds
- Consistent Docker images
- Immutable image versioning
- Faster releases
- Reduced human error
- Reproducible deployments
- Centralized image storage
- Automatic metadata generation

---

# Future Improvements

Possible enhancements include:

- Automated deployment to the production server after a successful build.
- Automated security scanning of Docker images.
- Running frontend unit and integration tests.
- Adding code quality checks with ESLint.
- Integrating vulnerability scanning tools such as Trivy.
- Sending deployment notifications to Slack or Microsoft Teams.

---

# Summary

GitHub Actions automates the entire build process for the Peerless DevOps Engineering Showcase. Every code change is validated, packaged into Docker images, tagged with version metadata, and published to GitHub Container Registry, ensuring consistent, repeatable, and production-ready builds.