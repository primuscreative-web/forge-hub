import assert from "node:assert/strict";
import test from "node:test";

import { creators, products } from "./mock-data";
import { resolveCatalogData, resolveCreatorPage, resolveProductPage } from "./catalog-api";

const originalFetch = globalThis.fetch;

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("falls back to mock catalog data when the API is unavailable", async () => {
  globalThis.fetch = async () => {
    throw new Error("unavailable");
  };
  const result = await resolveCatalogData("https://catalog.test/api", {
    categories: [],
    products: [],
    creators: [],
    product: null,
  });

  assert.equal(result.source, "mock");
  assert.ok(result.categories.length > 0);
  assert.ok(result.products.length > 0);
  assert.ok(result.creators.length > 0);
});

test("loads an existing product and its creator from the API", async () => {
  const product = products[0];
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.endsWith(`/products/${product.slug}`)) return jsonResponse(product);
    if (url.endsWith(`/creators/${product.creator}`)) return jsonResponse(creators[0]);
    if (url.includes(`/products?category=${product.category}`)) return jsonResponse([product]);
    return jsonResponse({ error: { code: "NOT_FOUND", message: "Not found" } }, 404);
  };

  const result = await resolveProductPage("https://catalog.test/api", product.slug);
  assert.equal(result.source, "api");
  assert.equal(result.product?.slug, product.slug);
  assert.equal(result.creator?.handle, creators[0].handle);
});

test("does not replace an API 404 with a mock product", async () => {
  globalThis.fetch = async () =>
    jsonResponse({ error: { code: "NOT_FOUND", message: "Product not found" } }, 404);

  const result = await resolveProductPage("https://catalog.test/api", "missing-product");
  assert.equal(result.source, "api");
  assert.equal(result.product, null);
});

test("loads an existing creator profile and products", async () => {
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.endsWith("/creators/acme-labs")) return jsonResponse(creators[0]);
    if (url.includes("/products?creator=c1")) return jsonResponse([products[0]]);
    return jsonResponse([], 200);
  };

  const result = await resolveCreatorPage("https://catalog.test/api", "acme-labs");
  assert.equal(result.source, "api");
  assert.equal(result.creator?.handle, "acme-labs");
  assert.equal(result.products[0]?.creator, "c1");
});

test("sends search, category, and sort parameters to product discovery", async () => {
  let productsRequest = "";
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes("/products?")) {
      productsRequest = url;
      return jsonResponse([products[0]]);
    }
    if (url.endsWith("/categories")) return jsonResponse([]);
    if (url.endsWith("/creators")) return jsonResponse([]);
    if (url.endsWith("/products/forge-hub")) return jsonResponse(products[0]);
    return jsonResponse([], 200);
  };

  const result = await resolveCatalogData(
    "https://catalog.test/api",
    { categories: [], products: [], creators: [], product: null },
    { q: "Forge", categories: ["saas"], sort: "rating" },
  );

  assert.equal(result.source, "api");
  assert.equal(result.products.length, 1);
  assert.match(productsRequest, /q=Forge/);
  assert.match(productsRequest, /category=saas/);
  assert.match(productsRequest, /sort=rating/);
});

test("keeps an empty API search result as an empty state", async () => {
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes("/products?")) return jsonResponse([]);
    if (url.endsWith("/products/forge-hub")) return jsonResponse(products[0]);
    return jsonResponse([]);
  };

  const result = await resolveCatalogData(
    "https://catalog.test/api",
    { categories: [], products: [], creators: [], product: null },
    { q: "no-results" },
  );
  assert.equal(result.source, "api");
  assert.deepEqual(result.products, []);
});
