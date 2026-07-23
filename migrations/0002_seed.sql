INSERT INTO categories (slug, name, count, group_name) VALUES
  ('saas', 'SaaS', 1284, 'Products'),
  ('ai-agents', 'AI Agents', 1420, 'AI & Automation'),
  ('cloudflare', 'Cloudflare', 212, 'Infrastructure'),
  ('templates', 'Templates', 2140, 'Products');

INSERT INTO products (id, slug, name, tagline, category, price, free, open_source, premium, enterprise, rating, reviews, sales, downloads, views, created_at, version, gradient, emoji, tech, description, creator, trending, new) VALUES
  ('p1', 'forge-hub', 'Forge Hub', 'A production-ready marketplace for developer tools', 'saas', 129, 0, 0, 1, 1, 4.8, 392, 1820, 12040, 28400, '2025-01-10', '1.2.0', 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)', '⚡', 'React,TypeScript,Cloudflare', 'Launch and manage a marketplace with real catalog data and D1-backed APIs.', 'c1', 1, 0),
  ('p2', 'mcp-agent-studio', 'MCP Agent Studio', 'Visual workflows for AI agents and MCP servers', 'ai-agents', 89, 0, 1, 1, 0, 4.6, 184, 960, 8160, 14600, '2025-04-18', '0.9.4', 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)', '🤖', 'TypeScript,OpenAI,Workers', 'Model Context Protocol workflows with a polished dashboard experience.', 'c2', 0, 1);

INSERT INTO creators (id, handle, name, avatar, verified, followers, sales, rating, bio, location, joined, organization) VALUES
  ('c1', 'acme-labs', 'Acme Labs', 'AL', 1, 24800, 12480, 4.9, 'Building tools developers love.', 'San Francisco', '2022-04-12', 'Acme Labs'),
  ('c2', 'nova-studio', 'Nova Studio', 'NS', 1, 18200, 9420, 4.8, 'Design systems and premium templates for modern SaaS.', 'Berlin', '2021-11-02', 'Nova Studio');
