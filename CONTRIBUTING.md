# Contributing Guide

Thank you for your interest in contributing to the Peerless DevOps Engineering Showcase.

Although this project was created as part of the Peerless DevOps Engineer Assessment, contributions, suggestions, and improvements are always welcome.

---

# Development Workflow

1. Fork the repository.

2. Clone your fork.

```bash
git clone https://github.com/<your-username>/peerless-devops-showcase.git
```

3. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

4. Make your changes.

5. Test your changes locally.

```bash
docker compose up --build
```

6. Commit your work.

```bash
git commit -m "Add my feature"
```

7. Push the branch.

```bash
git push origin feature/my-feature
```

8. Open a Pull Request.

---

# Project Standards

Please follow these standards:

- Use meaningful commit messages.
- Keep functions small and focused.
- Follow existing code style.
- Update documentation when necessary.
- Ensure Docker builds successfully.
- Ensure GitHub Actions pass before requesting review.

---

# Frontend Guidelines

- Use TypeScript.
- Keep components reusable.
- Avoid unnecessary dependencies.
- Follow React best practices.

---

# Backend Guidelines

- Follow REST API conventions.
- Return JSON responses.
- Keep controllers lightweight.
- Handle errors gracefully.

---

# Docker Guidelines

Always verify:

```bash
docker compose up --build
```

before submitting changes.

---

# Documentation

If your changes affect:

- APIs
- Docker
- Deployment
- Environment Variables
- Architecture

please update the corresponding documentation inside the `/docs` directory.

---

# Reporting Issues

When reporting an issue, include:

- Operating system
- Docker version
- Node.js version
- Browser
- Steps to reproduce
- Expected behavior
- Actual behavior

---

# Code of Conduct

Please be respectful and constructive.

All contributions should aim to improve the project while maintaining a welcoming environment.