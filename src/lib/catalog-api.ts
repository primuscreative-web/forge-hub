import type { Category, Creator, Product } from "./mock-data";
import { categories as mockCategories, creators as mockCreators, products as mockProducts, getProduct as getMockProduct } from "./mock-data";

export const CATALOG_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export type CatalogProductQuery = {
  q?: string;
  categories?: string[];
  creator?: string;
  sort?: string;
};

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

async function fetchOptionalJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as T;
}

function productsUrl(apiBaseUrl: string, query: CatalogProductQuery = {}) {
  const params = new URLSearchParams();
  if (query.q?.trim()) params.set("q", query.q.trim());
  if (query.categories?.length) params.set("category", query.categories.join(","));
  if (query.creator) params.set("creator", query.creator);
  if (query.sort) params.set("sort", query.sort);
  const search = params.toString();
  return `${apiBaseUrl}/products${search ? `?${search}` : ""}`;
}

export async function resolveCatalogData(
  apiBaseUrl: string,
  fallback: CatalogApiPayload,
  productQuery: CatalogProductQuery = {},
): Promise<CatalogDataResult> {
  try {
    const [categories, products, creators, product] = await Promise.all([
      fetchJson<Array<CatalogApiPayload["categories"][number]>>(`${apiBaseUrl}/categories`),
      fetchJson<Array<CatalogApiPayload["products"][number]>>(productsUrl(apiBaseUrl, productQuery)),
      fetchJson<Array<CatalogApiPayload["creators"][number]>>(`${apiBaseUrl}/creators`),
      fetchOptionalJson<CatalogApiPayload["products"][number]>(`${apiBaseUrl}/products/forge-hub`),
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

export async function resolveProductPage(apiBaseUrl: string, slug: string) {
  try {
    const product = await fetchOptionalJson<Product>(`${apiBaseUrl}/products/${encodeURIComponent(slug)}`);
    if (!product) return { source: "api" as const, product: null, creator: null, related: [] };

    const [creator, related] = await Promise.all([
      fetchOptionalJson<Creator>(`${apiBaseUrl}/creators/${encodeURIComponent(product.creator)}`),
      fetchJson<Product[]>(productsUrl(apiBaseUrl, { categories: [product.category] })),
    ]);
    return {
      source: "api" as const,
      product,
      creator: creator ?? mockCreators.find((entry) => entry.id === product.creator) ?? mockCreators[0],
      related: related.filter((entry) => entry.id !== product.id).slice(0, 4),
    };
  } catch {
    const product = getMockProduct(slug) ?? null;
    return {
      source: "mock" as const,
      product,
      creator: product
        ? mockCreators.find((entry) => entry.id === product.creator) ?? mockCreators[0]
        : null,
      related: product
        ? mockProducts
            .filter((entry) => entry.category === product.category && entry.id !== product.id)
            .slice(0, 4)
        : [],
    };
  }
}

export async function resolveCreatorPage(apiBaseUrl: string, slug: string) {
  try {
    const creator = await fetchOptionalJson<Creator>(`${apiBaseUrl}/creators/${encodeURIComponent(slug)}`);
    if (!creator) return { source: "api" as const, creator: null, products: [] };
    const products = await fetchJson<Product[]>(productsUrl(apiBaseUrl, { creator: creator.id }));
    return { source: "api" as const, creator, products };
  } catch {
    const creator = mockCreators.find((entry) => entry.handle === slug || entry.id === slug) ?? null;
    return {
      source: "mock" as const,
      creator,
      products: creator ? mockProducts.filter((entry) => entry.creator === creator.id) : [],
    };
  }
}
