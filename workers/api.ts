type CatalogCategory = {
  slug: string;
  name: string;
  count: number;
  group: string;
};

type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  free: boolean;
  openSource: boolean;
  premium: boolean;
  enterprise: boolean;
  rating: number;
  reviews: number;
  sales: number;
  downloads: number;
  views: number;
  createdAt: string;
  version: string;
  gradient: string;
  emoji: string;
  tech: string[];
  description: string;
  creator: string;
  trending?: boolean;
  new?: boolean;
};

type CatalogCreator = {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  verified: boolean;
  followers: number;
  sales: number;
  rating: number;
  bio: string;
  location: string;
  joined: string;
  organization?: string;
};

type Env = {
  DB?: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        all: () => Promise<{ results?: Array<Record<string, unknown>> }>;
        first: () => Promise<Record<string, unknown> | null>;
        run: () => Promise<{ success: boolean }>;
      };
      all: () => Promise<{ results?: Array<Record<string, unknown>> }>;
      run: () => Promise<{ success: boolean }>;
    };
  };
  ALLOWED_ORIGINS?: string;
  ENVIRONMENT?: string;
};

const MAX_RESULTS = 50;
const SESSION_COOKIE = "devforge_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const PASSWORD_ITERATIONS = 100_000;
const AUTH_LIMIT = 10;
const AUTH_WINDOW_MS = 15 * 60 * 1000;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const authAttempts = new Map<string, { count: number; resetAt: number }>();
const PRODUCT_SELECT = `
  SELECT id, slug, name, tagline, category, price, free, open_source, premium,
    enterprise, rating, reviews, sales, downloads, views, created_at, version,
    gradient, emoji, tech, description, creator, trending, new
  FROM products
`;

function toBoolean(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "true";
}

function toNumber(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

const seedCategories: CatalogCategory[] = [
  { slug: "saas", name: "SaaS", count: 1284, group: "Products" },
  { slug: "ai-agents", name: "AI Agents", count: 1420, group: "AI & Automation" },
  { slug: "cloudflare", name: "Cloudflare", count: 212, group: "Infrastructure" },
  { slug: "templates", name: "Templates", count: 2140, group: "Products" },
];

const seedProducts: CatalogProduct[] = [
  {
    id: "p1",
    slug: "forge-hub",
    name: "Forge Hub",
    tagline: "A production-ready marketplace for developer tools",
    category: "saas",
    price: 129,
    free: false,
    openSource: false,
    premium: true,
    enterprise: true,
    rating: 4.8,
    reviews: 392,
    sales: 1820,
    downloads: 12040,
    views: 28400,
    createdAt: "2025-01-10",
    version: "1.2.0",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
    emoji: "⚡",
    tech: ["React", "TypeScript", "Cloudflare"],
    description: "Launch and manage a marketplace with real catalog data and D1-backed APIs.",
    creator: "c1",
    trending: true,
  },
  {
    id: "p2",
    slug: "mcp-agent-studio",
    name: "MCP Agent Studio",
    tagline: "Visual workflows for AI agents and MCP servers",
    category: "ai-agents",
    price: 89,
    free: false,
    openSource: true,
    premium: true,
    enterprise: false,
    rating: 4.6,
    reviews: 184,
    sales: 960,
    downloads: 8160,
    views: 14600,
    createdAt: "2025-04-18",
    version: "0.9.4",
    gradient: "linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)",
    emoji: "🤖",
    tech: ["TypeScript", "OpenAI", "Workers"],
    description: "Model Context Protocol workflows with a polished dashboard experience.",
    creator: "c2",
    new: true,
  },
];

const seedCreators: CatalogCreator[] = [
  {
    id: "c1",
    handle: "acme-labs",
    name: "Acme Labs",
    avatar: "AL",
    verified: true,
    followers: 24800,
    sales: 12480,
    rating: 4.9,
    bio: "Building tools developers love.",
    location: "San Francisco",
    joined: "2022-04-12",
    organization: "Acme Labs",
  },
  {
    id: "c2",
    handle: "nova-studio",
    name: "Nova Studio",
    avatar: "NS",
    verified: true,
    followers: 18200,
    sales: 9420,
    rating: 4.8,
    bio: "Design systems and premium templates for modern SaaS.",
    location: "Berlin",
    joined: "2021-11-02",
    organization: "Nova Studio",
  },
];

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "access-control-allow-headers": "Content-Type",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-origin": "*",
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function errorResponse(status: number, code: string, message: string) {
  return jsonResponse({ error: { code, message } }, status);
}

function allowedOrigin(request: Request, env: Env) {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const allowed = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const permitted = allowed.some((entry) => {
    if (entry === origin) return true;
    const wildcard = entry.indexOf("*");
    return wildcard >= 0 && origin.startsWith(entry.slice(0, wildcard)) && origin.endsWith(entry.slice(wildcard + 1));
  });
  return permitted ? origin : null;
}

function privateResponse(request: Request, env: Env, payload: unknown, status = 200, cookie?: string) {
  const origin = allowedOrigin(request, env);
  const headers = new Headers({
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
    vary: "Origin",
  });
  if (origin) {
    headers.set("access-control-allow-credentials", "true");
    headers.set("access-control-allow-origin", origin);
  }
  if (cookie) headers.set("set-cookie", cookie);
  return new Response(JSON.stringify(payload), { status, headers });
}

function authError(request: Request, env: Env, status: number, code: string, message: string) {
  return privateResponse(request, env, { error: { code, message } }, status);
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return bytesToBase64(new Uint8Array(digest));
}

async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: PASSWORD_ITERATIONS },
    key,
    256,
  );
  return `pbkdf2-sha256$${PASSWORD_ITERATIONS}$${bytesToBase64(salt)}$${bytesToBase64(new Uint8Array(bits))}`;
}

async function verifyPassword(password: string, encoded: string) {
  const [algorithm, iterationsValue, saltValue, hashValue] = encoded.split("$");
  const iterations = Number(iterationsValue);
  if (algorithm !== "pbkdf2-sha256" || !Number.isInteger(iterations) || !saltValue || !hashValue) return false;
  const expected = base64ToBytes(hashValue);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: base64ToBytes(saltValue), iterations },
    key,
    expected.length * 8,
  );
  const actual = new Uint8Array(bits);
  if (actual.length !== expected.length) return false;
  let mismatch = 0;
  for (let index = 0; index < actual.length; index += 1) mismatch |= actual[index] ^ expected[index];
  return mismatch === 0;
}

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function validPassword(value: unknown): value is string {
  return typeof value === "string" && value.length >= 10 && value.length <= 128;
}

function publicUser(row: Record<string, unknown>) {
  return {
    id: String(row.id),
    email: String(row.email),
    displayName: String(row.display_name),
    role: String(row.role),
    status: String(row.status),
    emailVerifiedAt: row.email_verified_at ? String(row.email_verified_at) : null,
    createdAt: String(row.created_at),
  };
}

function cookieToken(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  for (const part of cookie.split(";")) {
    const [name, ...value] = part.trim().split("=");
    if (name === SESSION_COOKIE) return decodeURIComponent(value.join("="));
  }
  return null;
}

function sessionCookie(token: string, env: Env, expires = SESSION_TTL_SECONDS) {
  const sameSite = env.ENVIRONMENT === "same-site-production" ? "Lax" : "None";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Secure; Path=/; SameSite=${sameSite}; Max-Age=${expires}`;
}

function rateLimited(key: string) {
  const now = Date.now();
  const entry = authAttempts.get(key);
  if (!entry || entry.resetAt <= now) {
    authAttempts.set(key, { count: 1, resetAt: now + AUTH_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > AUTH_LIMIT;
}

async function requestBody(request: Request) {
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) return null;
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function createSession(request: Request, env: Env, userId: string) {
  const token = bytesToBase64(crypto.getRandomValues(new Uint8Array(32)));
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_SECONDS * 1000).toISOString();
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  await env.DB!.prepare(
    "INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at, last_seen_at, user_agent, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  )
    .bind(
      crypto.randomUUID(),
      userId,
      await sha256(token),
      expiresAt,
      now.toISOString(),
      now.toISOString(),
      request.headers.get("user-agent")?.slice(0, 500) ?? null,
      await sha256(ip),
    )
    .run();
  return token;
}

async function authenticatedUser(request: Request, env: Env) {
  const token = cookieToken(request);
  if (!token || !env.DB) return null;
  const row = await env.DB.prepare(
    `SELECT users.id, users.email, users.display_name, users.role, users.status,
      users.email_verified_at, users.created_at, sessions.id AS session_id
     FROM sessions JOIN users ON users.id = sessions.user_id
     WHERE sessions.token_hash = ? AND sessions.revoked_at IS NULL
       AND datetime(sessions.expires_at) > datetime('now') AND users.status = 'active'
     LIMIT 1`,
  ).bind(await sha256(token)).first();
  if (!row) return null;
  await env.DB.prepare("UPDATE sessions SET last_seen_at = ? WHERE id = ?")
    .bind(new Date().toISOString(), row.session_id)
    .run();
  return row;
}

async function handleAuth(request: Request, env: Env, pathname: string) {
  if (!env.DB) return authError(request, env, 503, "SERVICE_UNAVAILABLE", "Authentication unavailable");
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";

  if (pathname === "/api/v1/auth/register" && request.method === "POST") {
    const body = await requestBody(request);
    const email = normalizeEmail(body?.email);
    const password = body?.password;
    const displayName = typeof body?.displayName === "string" ? body.displayName.trim() : "";
    if (rateLimited(`register:${ip}`)) return authError(request, env, 429, "RATE_LIMITED", "Too many attempts");
    if (!EMAIL_PATTERN.test(email) || email.length > 254 || !validPassword(password) || displayName.length < 2 || displayName.length > 80) {
      return authError(request, env, 400, "INVALID_INPUT", "Invalid registration data");
    }
    const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ? LIMIT 1").bind(email).first();
    if (existing) return authError(request, env, 409, "EMAIL_EXISTS", "Email already registered");
    const now = new Date().toISOString();
    const userId = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO users (id, email, password_hash, display_name, role, status, created_at, updated_at) VALUES (?, ?, ?, ?, 'buyer', 'active', ?, ?)",
    ).bind(userId, email, await hashPassword(password), displayName, now, now).run();
    const user = await env.DB.prepare("SELECT id, email, display_name, role, status, email_verified_at, created_at FROM users WHERE id = ?")
      .bind(userId).first();
    const token = await createSession(request, env, userId);
    return privateResponse(request, env, { user: publicUser(user!) }, 201, sessionCookie(token, env));
  }

  if (pathname === "/api/v1/auth/login" && request.method === "POST") {
    const body = await requestBody(request);
    const email = normalizeEmail(body?.email);
    const password = body?.password;
    if (rateLimited(`login:${ip}:${email}`)) return authError(request, env, 429, "RATE_LIMITED", "Too many attempts");
    if (!EMAIL_PATTERN.test(email) || !validPassword(password)) {
      return authError(request, env, 401, "INVALID_CREDENTIALS", "Invalid email or password");
    }
    const user = await env.DB.prepare("SELECT id, email, password_hash, display_name, role, status, email_verified_at, created_at FROM users WHERE email = ? LIMIT 1")
      .bind(email).first();
    if (!user || user.status !== "active" || !(await verifyPassword(password, String(user.password_hash)))) {
      return authError(request, env, 401, "INVALID_CREDENTIALS", "Invalid email or password");
    }
    await env.DB.prepare("UPDATE sessions SET revoked_at = ? WHERE user_id = ? AND revoked_at IS NULL")
      .bind(new Date().toISOString(), user.id).run();
    const token = await createSession(request, env, String(user.id));
    return privateResponse(request, env, { user: publicUser(user) }, 200, sessionCookie(token, env));
  }

  if (pathname === "/api/v1/auth/logout" && request.method === "POST") {
    const token = cookieToken(request);
    if (token) {
      await env.DB.prepare("UPDATE sessions SET revoked_at = ? WHERE token_hash = ? AND revoked_at IS NULL")
        .bind(new Date().toISOString(), await sha256(token)).run();
    }
    return privateResponse(request, env, { ok: true }, 200, sessionCookie("", env, 0));
  }

  if (pathname === "/api/v1/auth/me" && request.method === "GET") {
    const user = await authenticatedUser(request, env);
    return user
      ? privateResponse(request, env, { user: publicUser(user) })
      : authError(request, env, 401, "UNAUTHENTICATED", "Authentication required");
  }

  return authError(request, env, 404, "NOT_FOUND", "Not found");
}

function isValidSlug(value: string): boolean {
  return value.length > 0 && value.length <= 80 && SLUG_PATTERN.test(value);
}

function mapProduct(row: Record<string, unknown>) {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    name: String(row.name ?? ""),
    tagline: String(row.tagline ?? ""),
    description: String(row.description ?? ""),
    category: String(row.category ?? ""),
    subcategories: [String(row.category ?? "")],
    tags: toStringArray(row.tech),
    tech: toStringArray(row.tech),
    price: toNumber(row.price),
    license: toNumber(row.price) === 0 ? ["MIT"] : ["Personal", "Commercial", "Enterprise"],
    free: toBoolean(row.free),
    openSource: toBoolean(row.open_source),
    premium: toBoolean(row.premium),
    enterprise: toBoolean(row.enterprise),
    rating: toNumber(row.rating),
    reviews: toNumber(row.reviews),
    sales: toNumber(row.sales),
    downloads: toNumber(row.downloads),
    views: toNumber(row.views),
    bookmarks: Math.max(0, Math.floor(toNumber(row.sales) * 0.4)),
    version: String(row.version ?? "1.0.0"),
    updatedAt: String(row.created_at ?? ""),
    createdAt: String(row.created_at ?? ""),
    creator: String(row.creator ?? ""),
    featured: false,
    trending: toBoolean(row.trending),
    new: toBoolean(row.new),
    gradient: String(row.gradient ?? seedProducts[0].gradient),
    emoji: String(row.emoji ?? seedProducts[0].emoji),
  };
}

function mapCreator(row: Record<string, unknown>) {
  return {
    id: String(row.id ?? ""),
    handle: String(row.handle ?? ""),
    name: String(row.name ?? ""),
    avatar: String(row.avatar ?? ""),
    verified: toBoolean(row.verified),
    followers: toNumber(row.followers),
    sales: toNumber(row.sales),
    rating: toNumber(row.rating),
    bio: String(row.bio ?? ""),
    location: String(row.location ?? ""),
    joined: String(row.joined ?? ""),
    organization: row.organization ? String(row.organization) : undefined,
  };
}

async function listProducts(env: Env, url: URL) {
  if (!env.DB) return null;

  const q = (url.searchParams.get("q") ?? "").trim();
  const categoryValue = url.searchParams.get("category") ?? "";
  const creator = url.searchParams.get("creator") ?? "";
  const sort = url.searchParams.get("sort") ?? "popular";
  const limitValue = url.searchParams.get("limit") ?? String(MAX_RESULTS);
  const categories = categoryValue ? categoryValue.split(",").filter(Boolean) : [];
  const limit = Number(limitValue);

  if (q.length > 100 || /[\u0000-\u001f]/.test(q)) {
    return errorResponse(400, "INVALID_QUERY", "Invalid search query");
  }
  if (categories.length > 10 || categories.some((value) => !isValidSlug(value))) {
    return errorResponse(400, "INVALID_CATEGORY", "Invalid category");
  }
  if (creator && !isValidSlug(creator)) {
    return errorResponse(400, "INVALID_CREATOR", "Invalid creator");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_RESULTS) {
    return errorResponse(400, "INVALID_LIMIT", `Limit must be between 1 and ${MAX_RESULTS}`);
  }

  const orderBy: Record<string, string> = {
    popular: "sales DESC, id ASC",
    new: "created_at DESC, id ASC",
    rating: "rating DESC, id ASC",
    "price-asc": "price ASC, id ASC",
    "price-desc": "price DESC, id ASC",
  };
  if (!orderBy[sort]) return errorResponse(400, "INVALID_SORT", "Invalid sort option");

  const conditions = ["datetime(created_at) <= datetime('now')"];
  const values: unknown[] = [];
  if (q) {
    conditions.push("(name LIKE ? ESCAPE '\\' OR tagline LIKE ? ESCAPE '\\' OR description LIKE ? ESCAPE '\\' OR tech LIKE ? ESCAPE '\\')");
    const escaped = q.replace(/[\\%_]/g, "\\$&");
    values.push(`%${escaped}%`, `%${escaped}%`, `%${escaped}%`, `%${escaped}%`);
  }
  if (categories.length) {
    conditions.push(`category IN (${categories.map(() => "?").join(", ")})`);
    values.push(...categories);
  }
  if (creator) {
    conditions.push("creator = ?");
    values.push(creator);
  }
  values.push(limit);

  const statement = env.DB.prepare(
    `${PRODUCT_SELECT} WHERE ${conditions.join(" AND ")} ORDER BY ${orderBy[sort]} LIMIT ?`,
  );
  const result = await statement.bind(...values).all();
  return (result.results ?? []).map(mapProduct);
}

async function findProduct(env: Env, slug: string) {
  if (!env.DB) return null;
  const row = await env.DB
    .prepare(`${PRODUCT_SELECT} WHERE slug = ? AND datetime(created_at) <= datetime('now') LIMIT 1`)
    .bind(slug)
    .first();
  return row ? mapProduct(row) : null;
}

async function findCreator(env: Env, slug: string) {
  if (!env.DB) return null;
  const row = await env.DB
    .prepare(
      "SELECT id, handle, name, avatar, verified, followers, sales, rating, bio, location, joined, organization FROM creators WHERE handle = ? OR id = ? LIMIT 1",
    )
    .bind(slug, slug)
    .first();
  return row ? mapCreator(row) : null;
}

async function readCatalogFromD1(env: Env) {
  if (!env.DB) return null;
  try {
    const categoriesResult = await env.DB.prepare("SELECT slug, name, count, group_name FROM categories").all();
    const productsResult = await env.DB.prepare("SELECT * FROM products").all();
    const creatorsResult = await env.DB.prepare("SELECT * FROM creators").all();

    const categories = (categoriesResult.results ?? []).map((row) => ({
      slug: String(row.slug ?? ""),
      name: String(row.name ?? ""),
      count: toNumber(row.count),
      group: String(row.group_name ?? "Products"),
    }));

    const products = (productsResult.results ?? []).map(mapProduct);
    const creators = (creatorsResult.results ?? []).map(mapCreator);

    return { categories, products, creators };
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      const origin = allowedOrigin(request, env);
      if (!origin) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-headers": "Content-Type",
          "access-control-allow-methods": "GET, POST, OPTIONS",
          "access-control-allow-origin": origin,
          "access-control-allow-credentials": "true",
          "access-control-max-age": "86400",
          vary: "Origin",
        },
      });
    }

    if (url.pathname.startsWith("/api/v1/auth/")) {
      try {
        return await handleAuth(request, env, url.pathname);
      } catch (error) {
        console.error("Authentication request failed", error instanceof Error ? error.message : "Unknown error");
        return authError(request, env, 500, "INTERNAL_ERROR", "Unable to process authentication");
      }
    }

    if (url.pathname === "/api/health") {
      return jsonResponse({ ok: true, service: "devforge-hub-api", source: env.DB ? "d1" : "seed" });
    }

    if (url.pathname === "/api/v1/categories") {
      const data = await readCatalogFromD1(env);
      return jsonResponse(data?.categories ?? seedCategories);
    }

    if (url.pathname === "/api/v1/products") {
      try {
        const result = await listProducts(env, url);
        if (result instanceof Response) return result;
        return jsonResponse(result ?? seedProducts);
      } catch {
        return errorResponse(500, "INTERNAL_ERROR", "Unable to load products");
      }
    }

    if (url.pathname === "/api/v1/creators") {
      const data = await readCatalogFromD1(env);
      return jsonResponse(data?.creators ?? seedCreators);
    }

    if (url.pathname.startsWith("/api/v1/products/")) {
      const slug = url.pathname.replace("/api/v1/products/", "");
      if (!isValidSlug(slug)) return errorResponse(400, "INVALID_SLUG", "Invalid product slug");
      try {
        const product = (await findProduct(env, slug)) ??
          (!env.DB ? seedProducts.find((entry) => entry.slug === slug) : null);
        return product
          ? jsonResponse(product)
          : errorResponse(404, "NOT_FOUND", "Product not found");
      } catch {
        return errorResponse(500, "INTERNAL_ERROR", "Unable to load product");
      }
    }

    if (url.pathname.startsWith("/api/v1/creators/")) {
      const slug = url.pathname.replace("/api/v1/creators/", "");
      if (!isValidSlug(slug)) return errorResponse(400, "INVALID_SLUG", "Invalid creator slug");
      try {
        const creator = (await findCreator(env, slug)) ??
          (!env.DB
            ? seedCreators.find((entry) => entry.handle === slug || entry.id === slug)
            : null);
        return creator
          ? jsonResponse(creator)
          : errorResponse(404, "NOT_FOUND", "Creator not found");
      } catch {
        return errorResponse(500, "INTERNAL_ERROR", "Unable to load creator");
      }
    }

    return jsonResponse({ error: "Not found" }, 404);
  },
};
