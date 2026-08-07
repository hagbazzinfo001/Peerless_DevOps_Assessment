# GitHub Container Registry (GHCR)

## Overview

The Peerless DevOps Engineering Showcase uses **GitHub Container Registry (GHCR)** as its centralized Docker image repository.

Instead of building Docker images directly on the production server, the GitHub Actions pipeline builds, versions, and publishes images to GHCR. The production server simply pulls the latest images and starts the containers.

This approach follows modern DevOps best practices by separating the **build stage** from the **deployment stage**.

---

# Why GitHub Container Registry?

GitHub Container Registry is GitHub's official container image registry.

It integrates seamlessly with:

- GitHub Actions
- GitHub Repositories
- Docker
- OCI-compatible container runtimes

Using GHCR allows images to be securely stored alongside the source code while providing version control and access management.

---

# Benefits

Using GHCR provides several advantages:

- Centralized image storage
- Automatic integration with GitHub Actions
- Secure authentication
- Versioned Docker images
- Immutable image tags
- Simplified production deployments
- Easy rollback capability

---

# Container Lifecycle

The lifecycle of a Docker image in this project follows these stages:

```
Developer

      │

      ▼

Git Push

      │

      ▼

GitHub Actions

      │

      ▼

Docker Build

      │

      ▼

Docker Image

      │

      ▼

GitHub Container Registry

      │

      ▼

Google Cloud VM

      │

      ▼

docker compose pull

      │

      ▼

Application Running
```

---

# Authentication

GitHub Actions authenticates automatically using the built-in GitHub token.

```yaml
- name: Login to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

No Personal Access Token (PAT) is required for publishing images within the repository.

---

# Image Naming Convention

Images are published using the following naming convention:

Backend

```
ghcr.io/<github-username>/peerless-backend
```

Frontend

```
ghcr.io/<github-username>/peerless-frontend
```

Example:

```
ghcr.io/hagbazzinfo001/peerless-backend
```

```
ghcr.io/hagbazzinfo001/peerless-frontend
```

---

# Image Tags

Each build produces two Docker image tags.

## Latest

```
latest
```

Always points to the newest successful build.

Example:

```
ghcr.io/hagbazzinfo001/peerless-backend:latest
```

---

## Version Tag

Each image is also tagged using the short Git commit SHA.

Example:

```
ghcr.io/hagbazzinfo001/peerless-backend:4f29ac1
```

Advantages include:

- Immutable deployments
- Rollback capability
- Version traceability
- Deployment auditing

---

# Build Metadata

During the CI workflow, metadata is generated automatically.

```yaml
echo "BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')" >> $GITHUB_ENV

echo "SHORT_SHA=${GITHUB_SHA::7}" >> $GITHUB_ENV
```

These values are passed into Docker during the build process.

```dockerfile
ARG BUILD_DATE

ARG APP_VERSION
```

The backend then exposes them through the API.

Example:

```json
{
  "version": "4f29ac1",
  "buildDate": "2026-08-07T06:30:14Z"
}
```

---

# Publishing Images

Backend image

```bash
docker build \
  -t ghcr.io/hagbazzinfo001/peerless-backend:latest \
  -t ghcr.io/hagbazzinfo001/peerless-backend:$SHORT_SHA \
  ./backend
```

Push

```bash
docker push ghcr.io/hagbazzinfo001/peerless-backend:latest

docker push ghcr.io/hagbazzinfo001/peerless-backend:$SHORT_SHA
```

The same process is repeated for the frontend image.

---

# Pulling Images

The production server never builds Docker images.

Instead, it downloads them directly from GHCR.

```bash
docker compose pull
```

Compose retrieves the newest versions from GitHub Container Registry.

---

# Updating the Application

A typical deployment consists of only three commands.

```bash
git pull

docker compose pull

docker compose up -d
```

This significantly reduces deployment time because image compilation has already occurred inside GitHub Actions.

---

# Viewing Available Images

Images can be viewed from the GitHub repository.

Navigate to

```
Repository

↓

Packages
```

Example:

```
peerless-backend

peerless-frontend
```

Each package contains:

- Available versions
- Tags
- Pull commands
- Download statistics
- Package metadata

---

# Rollback Strategy

One of the primary advantages of GHCR is the ability to roll back to previous versions.

Instead of using:

```yaml
image:
  ghcr.io/hagbazzinfo001/peerless-backend:latest
```

a specific version can be deployed.

Example:

```yaml
image:
  ghcr.io/hagbazzinfo001/peerless-backend:4f29ac1
```

This guarantees that a known-good build is deployed.

---

# Security

Images are stored privately or publicly depending on repository configuration.

Authentication is handled through GitHub credentials.

The production server requires only pull access.

Best practices followed:

- No credentials embedded in Docker images
- No secrets committed to Git
- Build metadata injected during CI
- Registry authentication handled securely

---

# Best Practices Implemented

This project follows several container registry best practices:

- Semantic image naming
- Immutable version tags
- Latest tag for convenience
- Automated publishing
- Centralized image storage
- Build metadata injection
- Separate build and deployment stages
- Docker Compose image references
- GitHub-native authentication

---

# Future Improvements

Potential enhancements include:

- Automatic cleanup of old image versions
- Image vulnerability scanning with Trivy
- Image signing using Cosign
- Software Bill of Materials (SBOM) generation
- Multi-architecture image builds (amd64 and arm64)
- Automated deployment after successful image publication

---

# Summary

GitHub Container Registry serves as the central repository for all Docker images in the Peerless DevOps Engineering Showcase.

The CI pipeline automatically builds, versions, and publishes container images, while the production server retrieves those images during deployment. This approach ensures consistent, repeatable, and traceable deployments while following modern DevOps best practices.