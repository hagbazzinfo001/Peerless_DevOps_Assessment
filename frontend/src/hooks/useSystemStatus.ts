import { useEffect, useState } from "react";
import api from "../api/api";
import type {
  HealthResponse,
  VersionResponse,
} from "../types/company";

export function useSystemStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [version, setVersion] = useState<VersionResponse | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const [healthRes, versionRes] = await Promise.all([
          api.get("/health"),
          api.get("/info"),
        ]);

        setHealth(healthRes.data);
        setVersion(versionRes.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStatus();
  }, []);

  return { health, version };
}