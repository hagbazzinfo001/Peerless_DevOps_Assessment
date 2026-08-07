import { useEffect, useState } from "react";
import api from "../api/api";
import type { CompanyResponse } from "../types/company";
export function useCompany() {
  const [data, setData] = useState<CompanyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const response = await api.get("/api/company");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, []);

  return { data, loading };
}