CREATE TABLE assets (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL,
  creator_id TEXT,
  product_id TEXT,
  bucket TEXT NOT NULL CHECK (bucket IN ('public_media','private_products')),
  object_key TEXT NOT NULL UNIQUE,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL CHECK (size_bytes >= 0),
  kind TEXT NOT NULL CHECK (kind IN ('avatar','creator_cover','product_thumbnail','product_gallery','product_file')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','deleted')),
  created_at TEXT NOT NULL,
  deleted_at TEXT,
  FOREIGN KEY (owner_user_id) REFERENCES users(id),
  FOREIGN KEY (creator_id) REFERENCES creator_profiles(id),
  FOREIGN KEY (product_id) REFERENCES creator_products(id)
);

CREATE INDEX assets_owner_idx ON assets(owner_user_id, status);
CREATE INDEX assets_product_idx ON assets(product_id, kind, status);

CREATE TABLE download_events (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  user_id TEXT,
  session_hash TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES creator_products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX download_events_product_idx ON download_events(product_id, created_at);
