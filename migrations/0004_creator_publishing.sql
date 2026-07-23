CREATE TABLE creator_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT,
  cover_url TEXT,
  website_url TEXT,
  github_url TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE creator_products (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('saas','template','boilerplate','ui_kit','api','sdk','ai_agent','prompt','mcp','devops','documentation','other')),
  price_cents INTEGER NOT NULL DEFAULT 0 CHECK (price_cents >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  thumbnail_url TEXT,
  gallery TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','unpublished','archived')),
  version TEXT NOT NULL DEFAULT '1.0.0',
  demo_url TEXT,
  repository_url TEXT,
  documentation_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT,
  FOREIGN KEY (creator_id) REFERENCES creator_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(slug)
);

CREATE INDEX creator_products_creator_id_idx ON creator_products(creator_id);
CREATE INDEX creator_products_status_idx ON creator_products(status, published_at);

DELETE FROM products WHERE id IN ('p1', 'p2') AND creator IN ('c1', 'c2');
DELETE FROM creators WHERE id IN ('c1', 'c2') AND handle IN ('acme-labs', 'nova-studio');
UPDATE categories SET count = 0;
