import type { Category, Creator, Product } from "./mock-data";
import { categories as mockCategories, creators as mockCreators, products as mockProducts, getProduct as getMockProduct } from "./mock-data";

export type CatalogApiPayload = {
  categories: Category[];
  products: Product[];
  creators: Creator[];
  product: Product | null;
};

export type CatalogDataResult = {
  source: "api" | "mock";
  categories: CatalogApiPayload["categories"];
  products: CatalogApiPayload["products"];
  creators: CatalogApiPayload["creators"];
  product: CatalogApiPayload["product"];
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as T;
}

export async function resolveCatalogData(
  apiBaseUrl: string,
  fallback: CatalogApiPayload,
): Promise<CatalogDataResult> {
  try {
    const [categories, products, creators, product] = await Promise.all([
      fetchJson<Array<CatalogApiPayload["categories"][number]>>(`${apiBaseUrl}/categories`),
      fetchJson<Array<CatalogApiPayload["products"][number]>>(`${apiBaseUrl}/products`),
      fetchJson<Array<CatalogApiPayload["creators"][number]>>(`${apiBaseUrl}/creators`),
      fetchJson<CatalogApiPayload["product"]>(`${apiBaseUrl}/products/preview`),
    ]);

    return {
      source: "api",
      categories,
      products,
      creators,
      product,
    };
  } catch {
    return {
      source: "mock",
      categories: fallback.categories.length ? fallback.categories : mockCategories,
      products: fallback.products.length ? fallback.products : mockProducts,
      creators: fallback.creators.length ? fallback.creators : mockCreators,
      product: fallback.product ?? getMockProduct("forge-hub") ?? null,
    };
  }
}
