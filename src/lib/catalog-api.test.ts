import assert from "node:assert/strict";
import test from "node:test";

import { resolveCatalogData } from "./catalog-api";

test("falls back to mock catalog data when the API is unavailable", async () => {
  const result = await resolveCatalogData("https://example.invalid/api", {
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
