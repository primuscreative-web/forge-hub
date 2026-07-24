ALTER TABLE assets ADD COLUMN content_hash TEXT;
CREATE INDEX assets_content_hash_idx ON assets(owner_user_id, product_id, kind, content_hash, status);
