import { useEffect, useState } from "react";

import { CATALOG_API_BASE_URL, resolveCatalogData, type CatalogProductQuery } from "./catalog-api";

export function useCatalogData(productQuery: CatalogProductQuery = {}) {
  const [data, setData] = useState<Awaited<ReturnType<typeof resolveCatalogData>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (mounted) setLoading(true);
      try {
        const result = await resolveCatalogData(CATALOG_API_BASE_URL, {
          categories: [],
          products: [],
          creators: [],
          product: null,
        }, productQuery);
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
  }, [productQuery.q, productQuery.creator, productQuery.sort, productQuery.categories?.join(",")]);

  return { data, loading, error };
}
