# Troubleshooting

## Backend won't start

Check:

```bash
docker logs peerless-backend
```

---

## Frontend not loading

Check:

```bash
docker logs peerless-frontend
```

---

## Docker Compose issues

Rebuild everything:

```bash
docker compose down

docker compose build --no-cache

docker compose up
```

---

## Health Check Failed

Verify the backend is running:

```bash
curl http://localhost:5000/health
```