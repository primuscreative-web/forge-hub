const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export type CreatorProfile = {
  id: string; userId: string; slug: string; displayName: string; headline: string; bio: string;
  avatarUrl: string | null; coverUrl: string | null; websiteUrl: string | null;
  githubUrl: string | null; location: string | null; status: "active" | "suspended";
  createdAt: string; updatedAt: string;
};

export type CreatorProduct = {
  id: string; creatorId: string; categoryId: string; name: string; slug: string;
  shortDescription: string; description: string; productType: string; priceCents: number;
  currency: string; thumbnailUrl: string | null; gallery: string[];
  status: "draft" | "published" | "unpublished" | "archived"; version: string;
  demoUrl: string | null; repositoryUrl: string | null; documentationUrl: string | null;
  createdAt: string; updatedAt: string; publishedAt: string | null;
};

export type CreatorProfileInput = Pick<CreatorProfile, "slug" | "displayName" | "headline" | "bio"> &
  Partial<Pick<CreatorProfile, "avatarUrl" | "coverUrl" | "websiteUrl" | "githubUrl" | "location">>;

export type CreatorProductInput = Pick<CreatorProduct, "categoryId" | "name" | "slug" | "shortDescription" | "description" | "productType" | "priceCents" | "currency" | "version"> &
  Partial<Pick<CreatorProduct, "thumbnailUrl" | "gallery" | "demoUrl" | "repositoryUrl" | "documentationUrl">>;

export class CreatorApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/creator/${path}`, {
    ...init,
    credentials: "include",
    headers: { accept: "application/json", ...(init?.body ? { "content-type": "application/json" } : {}), ...init?.headers },
  });
  if (!response.ok) {
    let message = "Unable to complete the request";
    try { message = ((await response.json()) as { error?: { message?: string } }).error?.message ?? message; } catch { /* empty response */ }
    throw new CreatorApiError(response.status, message);
  }
  return response.status === 204 ? undefined as T : await response.json() as T;
}

export const creatorApi = {
  profile: () => request<{ profile: CreatorProfile }>("profile").then((value) => value.profile),
  createProfile: (input: CreatorProfileInput) => request<{ profile: CreatorProfile }>("profile", { method: "POST", body: JSON.stringify(input) }).then((value) => value.profile),
  updateProfile: (input: Partial<CreatorProfileInput>) => request<{ profile: CreatorProfile }>("profile", { method: "PATCH", body: JSON.stringify(input) }).then((value) => value.profile),
  products: () => request<{ products: CreatorProduct[] }>("products").then((value) => value.products),
  product: (id: string) => request<{ product: CreatorProduct }>(`products/${id}`).then((value) => value.product),
  createProduct: (input: CreatorProductInput) => request<{ product: CreatorProduct }>("products", { method: "POST", body: JSON.stringify(input) }).then((value) => value.product),
  updateProduct: (id: string, input: Partial<CreatorProductInput>) => request<{ product: CreatorProduct }>(`products/${id}`, { method: "PATCH", body: JSON.stringify(input) }).then((value) => value.product),
  deleteProduct: (id: string) => request<void>(`products/${id}`, { method: "DELETE" }),
  publishProduct: (id: string) => request<{ product: CreatorProduct }>(`products/${id}/publish`, { method: "POST" }).then((value) => value.product),
  unpublishProduct: (id: string) => request<{ product: CreatorProduct }>(`products/${id}/unpublish`, { method: "POST" }).then((value) => value.product),
};
