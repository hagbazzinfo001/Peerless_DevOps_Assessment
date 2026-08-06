# Peerless DevOps Engineering Showcase

A production-ready full-stack application demonstrating modern DevOps engineering practices including containerization, CI/CD automation, deployment scripting, and Docker orchestration.

---

## Features

- Node.js Express Backend API
- React + Vite Frontend
- Dockerized services
- Docker Compose orchestration
- GitHub Actions CI Pipeline
- Automated deployment scripts
- Health check script
- Environment configuration
- Production-ready project structure

---

## Tech Stack

### Backend
- Node.js
- Express

### Frontend
- React
- Vite
- TypeScript

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- Bash

---

## Project Structure

```text
peerless-devops-showcase/
│
├── backend/
├── frontend/
├── scripts/
├── docs/
├── .github/workflows/
├── docker-compose.yml
└── README.md
```

---

## Local Development

### Backend

```bash
cd backend
npm install
npm start
```

Runs on:

```
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Docker

### Backend

```bash
docker build -t peerless-backend ./backend

docker run -p 5000:5000 peerless-backend
```

### Frontend

```bash
docker build -t peerless-frontend ./frontend

docker run -p 3000:80 peerless-frontend
```

---

## Docker Compose

```bash
docker compose up --build
```

---

## Deployment

```bash
./scripts/deploy.sh
```

---

## Health Check

```bash
./scripts/health-check.sh
```

---

## Cleanup

```bash
./scripts/cleanup.sh
```

---

## CI/CD

GitHub Actions automatically:

- Installs dependencies
- Runs backend tests
- Builds frontend
- Builds Docker images

on every push to the `main` branch.

---

## API Endpoint

```
GET /company
```

Example:

```json
{
  "showcase": {
    "title": "Peerless DevOps Engineering Showcase"
  }
}
```

---

## Author

**Agbabiaka Hammed**