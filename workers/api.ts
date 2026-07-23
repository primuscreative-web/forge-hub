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
      };
      all: () => Promise<{ results?: Array<Record<string, unknown>> }>;
    };
  };
};

const MAX_RESULTS = 50;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
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
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-headers": "Content-Type",
          "access-control-allow-methods": "GET, OPTIONS",
          "access-control-allow-origin": "*",
        },
      });
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
