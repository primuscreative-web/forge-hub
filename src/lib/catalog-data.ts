import { useEffect, useState } from "react";

import { resolveCatalogData } from "./catalog-api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export function useCatalogData() {
  const [data, setData] = useState<Awaited<ReturnType<typeof resolveCatalogData>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const result = await resolveCatalogData(API_BASE_URL, {
          categories: [],
          products: [],
          creators: [],
          product: null,
        });
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unable to load catalog");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
