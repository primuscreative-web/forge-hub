import assert from "node:assert/strict";
import test from "node:test";

import worker from "./api";
import { isPrivatePath } from "../src/lib/auth";

type Row = Record<string, unknown>;

class FakeDB {
  users: Row[] = [];
  sessions: Row[] = [];
  profiles: Row[] = [];
  products: Row[] = [];
  categories: Row[] = [{ slug: "saas", name: "SaaS", count: 0, group_name: "Products" }];

  prepare(sql: string) {
    let values: unknown[] = [];
    const statement = {
      bind: (...input: unknown[]) => {
        values = input;
        return statement;
      },
      all: async () => ({ results: this.all(sql, values) }),
      first: async () => this.first(sql, values),
      run: async () => {
        this.run(sql, values);
        return { success: true };
      },
    };
    return statement;
  }

  private first(sql: string, values: unknown[]) {
    if (sql.includes("FROM users WHERE email = ?")) {
      const user = this.users.find((entry) => entry.email === values[0]);
      return user ? { ...user } : null;
    }
    if (sql.includes("FROM users WHERE id = ?")) {
      const user = this.users.find((entry) => entry.id === values[0]);
      return user ? { ...user } : null;
    }
    if (sql.includes("FROM sessions JOIN users")) {
      const session = this.sessions.find(
        (entry) => entry.token_hash === values[0] && !entry.revoked_at && Date.parse(String(entry.expires_at)) > Date.now(),
      );
      const user = session && this.users.find((entry) => entry.id === session.user_id && entry.status === "active");
      return user ? { ...user, session_id: session!.id } : null;
    }
    if (sql.includes("FROM creator_profiles WHERE user_id")) return this.profiles.find((entry) => entry.user_id === values[0]) ?? null;
    if (sql.includes("FROM creator_profiles WHERE slug") && sql.includes("user_id <>")) return this.profiles.find((entry) => entry.slug === values[0] && entry.user_id !== values[1]) ?? null;
    if (sql.includes("FROM creator_profiles WHERE status = 'active'")) { const profile = this.profiles.find((entry) => entry.status === "active" && (entry.slug === values[0] || entry.id === values[1])); return profile ? { ...profile, handle: profile.slug, name: profile.display_name, avatar: profile.display_name, joined: profile.created_at, organization: profile.headline } : null; }
    if (sql.includes("FROM categories WHERE slug")) return this.categories.find((entry) => entry.slug === values[0]) ?? null;
    if (sql.includes("FROM creator_products WHERE slug") && sql.includes("id<>")) return this.products.find((entry) => entry.slug === values[0] && entry.id !== values[1]) ?? null;
    if (sql.includes("FROM creator_products WHERE slug")) { const product = this.products.find((entry) => entry.slug === values[0] && (!sql.includes("status = 'published'") || entry.status === "published")); return product ? { ...product, tagline: product.short_description, category: product.category_id, creator: product.creator_id } : null; }
    if (sql.includes("FROM creator_products WHERE id")) return this.products.find((entry) => entry.id === values[0]) ?? null;
    return null;
  }

  private all(sql: string, values: unknown[]) {
    if (sql.includes("FROM creator_products WHERE creator_id")) return this.products.filter((entry) => entry.creator_id === values[0]).map((entry) => ({ ...entry }));
    if (sql.includes("FROM creator_products") && sql.includes("status = 'published'")) return this.products.filter((entry) => entry.status === "published").map((entry) => ({ ...entry, tagline: entry.short_description, category: entry.category_id, creator: entry.creator_id }));
    if (sql.includes("FROM categories")) return this.categories;
    if (sql.includes("FROM creator_profiles WHERE status = 'active'")) return this.profiles.filter((entry) => entry.status === "active");
    return [];
  }

  private run(sql: string, values: unknown[]) {
    if (sql.startsWith("INSERT INTO users")) {
      this.users.push({
        id: values[0], email: values[1], password_hash: values[2], display_name: values[3],
        role: "buyer", status: "active", email_verified_at: null, created_at: values[4], updated_at: values[5],
      });
      return;
    }
    if (sql.startsWith("INSERT INTO sessions")) {
      this.sessions.push({
        id: values[0], user_id: values[1], token_hash: values[2], expires_at: values[3],
        created_at: values[4], last_seen_at: values[5], user_agent: values[6], ip_hash: values[7], revoked_at: null,
      });
      return;
    }
    if (sql.includes("UPDATE sessions SET revoked_at") && sql.includes("user_id")) {
      for (const session of this.sessions) {
        if (session.user_id === values[1] && !session.revoked_at) session.revoked_at = values[0];
      }
      return;
    }
    if (sql.includes("UPDATE sessions SET revoked_at") && sql.includes("token_hash")) {
      for (const session of this.sessions) {
        if (session.token_hash === values[1] && !session.revoked_at) session.revoked_at = values[0];
      }
      return;
    }
    if (sql.includes("UPDATE sessions SET last_seen_at")) {
      const session = this.sessions.find((entry) => entry.id === values[1]);
      if (session) session.last_seen_at = values[0];
      return;
    }
    if (sql.startsWith("INSERT INTO creator_profiles")) { this.profiles.push({ id: values[0], user_id: values[1], slug: values[2], display_name: values[3], headline: values[4], bio: values[5], avatar_url: values[6], cover_url: values[7], website_url: values[8], github_url: values[9], location: values[10], status: "active", created_at: values[11], updated_at: values[12] }); return; }
    if (sql.startsWith("UPDATE users SET role")) { const user = this.users.find((entry) => entry.id === values[1]); if (user) user.role = "creator"; return; }
    if (sql.startsWith("INSERT INTO creator_products")) { this.products.push({ id: values[0], creator_id: values[1], category_id: values[2], name: values[3], slug: values[4], short_description: values[5], description: values[6], product_type: values[7], price_cents: values[8], currency: values[9], thumbnail_url: values[10], gallery: values[11], status: "draft", version: values[12], demo_url: values[13], repository_url: values[14], documentation_url: values[15], created_at: values[16], updated_at: values[17], published_at: null }); return; }
    if (sql.startsWith("UPDATE creator_products SET category_id")) { const product = this.products.find((entry) => entry.id === values[15]); if (product) Object.assign(product, { category_id: values[0], name: values[1], slug: values[2], short_description: values[3], description: values[4], product_type: values[5], price_cents: values[6], currency: values[7], thumbnail_url: values[8], gallery: values[9], version: values[10], demo_url: values[11], repository_url: values[12], documentation_url: values[13], updated_at: values[14] }); return; }
    if (sql.startsWith("UPDATE creator_products SET status")) { const product = this.products.find((entry) => entry.id === values[3]); if (product) Object.assign(product, { status: values[0], published_at: values[1], updated_at: values[2] }); return; }
    if (sql.startsWith("DELETE FROM creator_products")) { this.products = this.products.filter((entry) => !(entry.id === values[0] && entry.creator_id === values[1])); }
  }
}

const origin = "https://forge-hub-nine.vercel.app";
const env = (db = new FakeDB()) => ({
  DB: db,
  ALLOWED_ORIGINS: origin,
  ENVIRONMENT: "cross-site-preview",
});

let requestSequence = 0;
function request(path: string, body?: Row, cookie?: string, method?: string) {
  requestSequence += 1;
  return new Request(`https://api.test${path}`, {
    method: method ?? (body ? "POST" : "GET"),
    headers: {
      origin,
      "cf-connecting-ip": `192.0.2.${requestSequence}`,
      ...(body ? { "content-type": "application/json" } : {}),
      ...(cookie ? { cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function register(testEnv: ReturnType<typeof env>, email = "ada@example.com") {
  return worker.fetch(request("/api/v1/auth/register", {
    email,
    password: "correct-horse-battery-staple",
    displayName: "Ada Lovelace",
  }), testEnv);
}

function cookieFrom(response: Response) {
  return response.headers.get("set-cookie")!.split(";", 1)[0];
}

test("valid registration creates a secure session", async () => {
  const response = await register(env());
  assert.equal(response.status, 201);
  assert.match(response.headers.get("set-cookie") ?? "", /HttpOnly; Secure; Path=\/; SameSite=None/);
  assert.match(response.headers.get("set-cookie") ?? "", /Partitioned/);
  const body = await response.json() as { user: Row };
  assert.equal(body.user.email, "ada@example.com");
  assert.equal("password_hash" in body.user, false);
});

test("duplicate email is rejected", async () => {
  const testEnv = env();
  await register(testEnv);
  const response = await register(testEnv, "ADA@example.com");
  assert.equal(response.status, 409);
});

test("invalid password is rejected", async () => {
  const response = await worker.fetch(request("/api/v1/auth/register", {
    email: "short@example.com", password: "short", displayName: "Short User",
  }), env());
  assert.equal(response.status, 400);
});

test("valid login rotates the session", async () => {
  const testEnv = env();
  await register(testEnv);
  const response = await worker.fetch(request("/api/v1/auth/login", {
    email: "ada@example.com", password: "correct-horse-battery-staple",
  }), testEnv);
  assert.equal(response.status, 200);
  assert.equal(testEnv.DB.sessions.length, 2);
  assert.ok(testEnv.DB.sessions[0].revoked_at);
});

test("invalid login uses a generic response", async () => {
  const testEnv = env();
  await register(testEnv);
  const response = await worker.fetch(request("/api/v1/auth/login", {
    email: "ada@example.com", password: "incorrect-password",
  }), testEnv);
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
});

test("auth me returns the authenticated user", async () => {
  const testEnv = env();
  const registration = await register(testEnv);
  const response = await worker.fetch(request("/api/v1/auth/me", undefined, cookieFrom(registration)), testEnv);
  assert.equal(response.status, 200);
  assert.equal((await response.json() as { user: Row }).user.displayName, "Ada Lovelace");
});

test("auth me rejects a missing session", async () => {
  const response = await worker.fetch(request("/api/v1/auth/me"), env());
  assert.equal(response.status, 401);
});

test("logout revokes the current session", async () => {
  const testEnv = env();
  const registration = await register(testEnv);
  const cookie = cookieFrom(registration);
  const response = await worker.fetch(request("/api/v1/auth/logout", {}, cookie), testEnv);
  assert.equal(response.status, 200);
  assert.ok(testEnv.DB.sessions[0].revoked_at);
});

test("revoked session cannot access auth me", async () => {
  const testEnv = env();
  const registration = await register(testEnv);
  const cookie = cookieFrom(registration);
  await worker.fetch(request("/api/v1/auth/logout", {}, cookie), testEnv);
  const response = await worker.fetch(request("/api/v1/auth/me", undefined, cookie), testEnv);
  assert.equal(response.status, 401);
});

test("private routes are blocked while public creator profiles stay public", () => {
  assert.equal(isPrivatePath("/dashboard/purchases"), true);
  assert.equal(isPrivatePath("/creator/products"), true);
  assert.equal(isPrivatePath("/publish"), true);
  assert.equal(isPrivatePath("/settings/security"), true);
  assert.equal(isPrivatePath("/creator/acme-labs"), false);
  assert.equal(isPrivatePath("/marketplace"), false);
});

const profileInput = { displayName: "Ada Studio", slug: "ada-studio", headline: "Tools for developers", bio: "Building reliable tools for modern development teams." };
const productInput = { categoryId: "saas", name: "Ada Toolkit", slug: "ada-toolkit", shortDescription: "A practical toolkit for developers", description: "A complete and production-ready toolkit for modern developer workflows.", productType: "saas", priceCents: 0, currency: "USD", version: "1.0.0", demoUrl: "https://example.com/toolkit" };

async function creatorSession(testEnv: ReturnType<typeof env>, email = "creator@example.com", profile = profileInput) {
  const registration = await register(testEnv, email); const cookie = cookieFrom(registration);
  const response = await worker.fetch(request("/api/v1/creator/profile", profile, cookie), testEnv);
  assert.equal(response.status, 201);
  return cookie;
}

async function draft(testEnv: ReturnType<typeof env>, cookie: string, input: Row = productInput) {
  const response = await worker.fetch(request("/api/v1/creator/products", input, cookie), testEnv);
  assert.equal(response.status, 201);
  return (await response.json() as { product: Row }).product;
}

test("creator profile can be created and duplicate slugs are blocked", async () => {
  const testEnv = env(); await creatorSession(testEnv);
  const secondRegistration = await register(testEnv, "second@example.com");
  const response = await worker.fetch(request("/api/v1/creator/profile", profileInput, cookieFrom(secondRegistration)), testEnv);
  assert.equal(response.status, 409);
});

test("creator can create and edit an owned draft", async () => {
  const testEnv = env(); const cookie = await creatorSession(testEnv); const product = await draft(testEnv, cookie);
  const response = await worker.fetch(request(`/api/v1/creator/products/${product.id}`, { ...productInput, name: "Updated Toolkit" }, cookie, "PATCH"), testEnv);
  assert.equal(response.status, 200); assert.equal((await response.json() as { product: Row }).product.name, "Updated Toolkit");
});

test("another creator cannot edit a product they do not own", async () => {
  const testEnv = env(); const ownerCookie = await creatorSession(testEnv); const product = await draft(testEnv, ownerCookie);
  const otherCookie = await creatorSession(testEnv, "other@example.com", { ...profileInput, slug: "other-studio" });
  const response = await worker.fetch(request(`/api/v1/creator/products/${product.id}`, productInput, otherCookie, "PATCH"), testEnv);
  assert.equal(response.status, 403);
});

test("valid products publish into the catalog while drafts stay private", async () => {
  const testEnv = env(); const cookie = await creatorSession(testEnv); const product = await draft(testEnv, cookie);
  let catalog = await worker.fetch(request("/api/v1/products"), testEnv); assert.deepEqual(await catalog.json(), []);
  const publish = await worker.fetch(request(`/api/v1/creator/products/${product.id}/publish`, {}, cookie), testEnv); assert.equal(publish.status, 200);
  catalog = await worker.fetch(request("/api/v1/products"), testEnv); assert.equal((await catalog.json() as Row[]).length, 1);
});

test("incomplete products cannot be published", async () => {
  const testEnv = env(); const cookie = await creatorSession(testEnv); const product = await draft(testEnv, cookie, { ...productInput, shortDescription: "", description: "" });
  const response = await worker.fetch(request(`/api/v1/creator/products/${product.id}/publish`, {}, cookie), testEnv);
  assert.equal(response.status, 400);
});

test("products can be unpublished and deleted", async () => {
  const testEnv = env(); const cookie = await creatorSession(testEnv); const product = await draft(testEnv, cookie);
  await worker.fetch(request(`/api/v1/creator/products/${product.id}/publish`, {}, cookie), testEnv);
  const unpublish = await worker.fetch(request(`/api/v1/creator/products/${product.id}/unpublish`, {}, cookie), testEnv); assert.equal(unpublish.status, 200);
  assert.deepEqual(await (await worker.fetch(request("/api/v1/products"), testEnv)).json(), []);
  const deletion = await worker.fetch(request(`/api/v1/creator/products/${product.id}`, undefined, cookie, "DELETE"), testEnv); assert.equal(deletion.status, 204);
  assert.equal(testEnv.DB.products.length, 0);
});

test("private creator endpoints require a cross-site session", async () => {
  const testEnv = env();
  const blocked = await worker.fetch(request("/api/v1/creator/products"), testEnv); assert.equal(blocked.status, 401);
  const registration = await register(testEnv); const cookie = registration.headers.get("set-cookie") ?? "";
  assert.match(cookie, /SameSite=None/); assert.match(cookie, /Secure/); assert.match(cookie, /HttpOnly/);
});
