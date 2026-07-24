// Centralized mock data for DevForge Hub. All prices in USD.

export type Category = {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  count: number;
  group: string;
};

export const categoryGroups = [
  "Products",
  "Frameworks",
  "Infrastructure",
  "AI & Automation",
  "Design",
  "Extensions",
  "Data",
] as const;

export const categories: Category[] = [
  { slug: "saas", name: "SaaS", icon: "Rocket", count: 1284, group: "Products" },
  { slug: "full-systems", name: "Full Systems", icon: "Layers", count: 642, group: "Products" },
  {
    slug: "dashboards",
    name: "Dashboards",
    icon: "LayoutDashboard",
    count: 892,
    group: "Products",
  },
  { slug: "templates", name: "Templates", icon: "FileCode", count: 2140, group: "Products" },
  { slug: "boilerplates", name: "Boilerplates", icon: "Boxes", count: 918, group: "Products" },
  { slug: "ui-kits", name: "UI Kits", icon: "Palette", count: 734, group: "Design" },
  { slug: "components", name: "Components", icon: "Component", count: 3120, group: "Design" },
  { slug: "apis", name: "APIs", icon: "Plug", count: 512, group: "Products" },
  { slug: "sdks", name: "SDKs", icon: "Package", count: 342, group: "Products" },
  { slug: "ai-agents", name: "AI Agents", icon: "Bot", count: 1420, group: "AI & Automation" },
  {
    slug: "cursor-rules",
    name: "Cursor Rules",
    icon: "MousePointer2",
    count: 812,
    group: "AI & Automation",
  },
  {
    slug: "claude-skills",
    name: "Claude Skills",
    icon: "Sparkles",
    count: 604,
    group: "AI & Automation",
  },
  {
    slug: "codex-prompts",
    name: "Codex Prompts",
    icon: "Wand2",
    count: 388,
    group: "AI & Automation",
  },
  {
    slug: "mcp-servers",
    name: "MCP Servers",
    icon: "Server",
    count: 246,
    group: "AI & Automation",
  },
  {
    slug: "chrome-extensions",
    name: "Chrome Extensions",
    icon: "Chrome",
    count: 428,
    group: "Extensions",
  },
  {
    slug: "vscode-extensions",
    name: "VSCode Extensions",
    icon: "Code2",
    count: 560,
    group: "Extensions",
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    icon: "Network",
    count: 320,
    group: "Infrastructure",
  },
  { slug: "devops", name: "DevOps", icon: "Workflow", count: 480, group: "Infrastructure" },
  { slug: "docker", name: "Docker", icon: "Container", count: 288, group: "Infrastructure" },
  { slug: "kubernetes", name: "Kubernetes", icon: "Boxes", count: 176, group: "Infrastructure" },
  { slug: "cloud", name: "Cloud", icon: "Cloud", count: 512, group: "Infrastructure" },
  { slug: "aws", name: "AWS", icon: "Cloud", count: 344, group: "Infrastructure" },
  { slug: "azure", name: "Azure", icon: "Cloud", count: 168, group: "Infrastructure" },
  {
    slug: "cloudflare",
    name: "Cloudflare",
    icon: "CloudLightning",
    count: 212,
    group: "Infrastructure",
  },
  { slug: "firebase", name: "Firebase", icon: "Flame", count: 194, group: "Infrastructure" },
  { slug: "supabase", name: "Supabase", icon: "Database", count: 328, group: "Infrastructure" },
  { slug: "postgresql", name: "PostgreSQL", icon: "Database", count: 264, group: "Data" },
  { slug: "mysql", name: "MySQL", icon: "Database", count: 138, group: "Data" },
  { slug: "mongodb", name: "MongoDB", icon: "Database", count: 156, group: "Data" },
  { slug: "prisma", name: "Prisma", icon: "GitBranch", count: 178, group: "Data" },
  { slug: "drizzle", name: "Drizzle", icon: "Droplets", count: 96, group: "Data" },
  { slug: "stripe", name: "Stripe", icon: "CreditCard", count: 244, group: "Products" },
  { slug: "auth", name: "Authentication", icon: "ShieldCheck", count: 312, group: "Products" },
  { slug: "security", name: "Security", icon: "Lock", count: 218, group: "Products" },
  { slug: "monitoring", name: "Monitoring", icon: "Activity", count: 142, group: "Infrastructure" },
  { slug: "logging", name: "Logging", icon: "Terminal", count: 118, group: "Infrastructure" },
  { slug: "ai", name: "AI", icon: "Brain", count: 964, group: "AI & Automation" },
  {
    slug: "ml",
    name: "Machine Learning",
    icon: "BrainCircuit",
    count: 512,
    group: "AI & Automation",
  },
  { slug: "mobile", name: "Mobile", icon: "Smartphone", count: 486, group: "Frameworks" },
  {
    slug: "react-native",
    name: "React Native",
    icon: "Smartphone",
    count: 296,
    group: "Frameworks",
  },
  { slug: "flutter", name: "Flutter", icon: "Feather", count: 218, group: "Frameworks" },
  { slug: "swift", name: "Swift", icon: "Apple", count: 148, group: "Frameworks" },
  { slug: "kotlin", name: "Kotlin", icon: "Coffee", count: 132, group: "Frameworks" },
  { slug: "python", name: "Python", icon: "Code", count: 612, group: "Frameworks" },
  { slug: "go", name: "Go", icon: "Zap", count: 268, group: "Frameworks" },
  { slug: "rust", name: "Rust", icon: "Cog", count: 184, group: "Frameworks" },
  { slug: "java", name: "Java", icon: "Coffee", count: 216, group: "Frameworks" },
  { slug: "dotnet", name: ".NET", icon: "Hash", count: 178, group: "Frameworks" },
  { slug: "laravel", name: "Laravel", icon: "Flame", count: 194, group: "Frameworks" },
  { slug: "django", name: "Django", icon: "Layers", count: 168, group: "Frameworks" },
  { slug: "rails", name: "Rails", icon: "Train", count: 96, group: "Frameworks" },
  { slug: "nextjs", name: "Next.js", icon: "Triangle", count: 812, group: "Frameworks" },
  { slug: "nuxt", name: "Nuxt", icon: "Mountain", count: 218, group: "Frameworks" },
  { slug: "remix", name: "Remix", icon: "Music", count: 132, group: "Frameworks" },
  { slug: "astro", name: "Astro", icon: "Rocket", count: 168, group: "Frameworks" },
  { slug: "electron", name: "Electron", icon: "Atom", count: 88, group: "Frameworks" },
  { slug: "games", name: "Games", icon: "Gamepad2", count: 244, group: "Products" },
  { slug: "unity", name: "Unity", icon: "Box", count: 172, group: "Products" },
  { slug: "godot", name: "Godot", icon: "CircuitBoard", count: 96, group: "Products" },
  { slug: "unreal", name: "Unreal", icon: "Box", count: 82, group: "Products" },
  { slug: "icons", name: "Icons", icon: "Shapes", count: 462, group: "Design" },
  { slug: "design-systems", name: "Design Systems", icon: "Grid3x3", count: 218, group: "Design" },
  { slug: "figma-kits", name: "Figma Kits", icon: "Figma", count: 384, group: "Design" },
  {
    slug: "framer-templates",
    name: "Framer Templates",
    icon: "Frame",
    count: 196,
    group: "Design",
  },
  { slug: "documentation", name: "Documentation", icon: "BookOpen", count: 244, group: "Products" },
  {
    slug: "automation",
    name: "Automation",
    icon: "Workflow",
    count: 312,
    group: "AI & Automation",
  },
  { slug: "scripts", name: "Scripts", icon: "ScrollText", count: 486, group: "AI & Automation" },
  { slug: "ci-cd", name: "CI/CD", icon: "GitMerge", count: 218, group: "Infrastructure" },
  {
    slug: "github-actions",
    name: "GitHub Actions",
    icon: "Github",
    count: 244,
    group: "Infrastructure",
  },
  { slug: "terraform", name: "Terraform", icon: "Boxes", count: 128, group: "Infrastructure" },
  {
    slug: "digital-products",
    name: "Digital Products",
    icon: "Sparkles",
    count: 812,
    group: "Products",
  },
];

export type Creator = {
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
  avatarUrl?: string;
  coverUrl?: string;
};

export const creators: Creator[] = [
  {
    id: "c1",
    handle: "acme-labs",
    name: "Acme Labs",
    avatar: "AL",
    verified: true,
    followers: 24800,
    sales: 12480,
    rating: 4.9,
    bio: "Building tools developers love. Ex-Vercel, Ex-Stripe.",
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
  {
    id: "c3",
    handle: "kaito-r",
    name: "Kaito Rivera",
    avatar: "KR",
    verified: true,
    followers: 12480,
    sales: 6180,
    rating: 4.9,
    bio: "Full-stack indie hacker. Rust, Go, TypeScript.",
    location: "Tokyo",
    joined: "2023-01-20",
  },
  {
    id: "c4",
    handle: "prism-agency",
    name: "Prism Agency",
    avatar: "PA",
    verified: true,
    followers: 9820,
    sales: 4820,
    rating: 4.7,
    bio: "Agency crafting Framer & Next.js templates.",
    location: "Lisbon",
    joined: "2022-08-30",
    organization: "Prism Agency",
  },
  {
    id: "c5",
    handle: "elena-code",
    name: "Elena Costa",
    avatar: "EC",
    verified: false,
    followers: 3820,
    sales: 1240,
    rating: 4.6,
    bio: "Backend engineer sharing production-grade boilerplates.",
    location: "São Paulo",
    joined: "2024-02-14",
  },
  {
    id: "c6",
    handle: "quantum-devs",
    name: "Quantum Devs",
    avatar: "QD",
    verified: true,
    followers: 15420,
    sales: 7480,
    rating: 4.8,
    bio: "AI agents, MCP servers, Cursor rules.",
    location: "Remote",
    joined: "2023-06-08",
    organization: "Quantum Devs",
  },
  {
    id: "c7",
    handle: "hana-ui",
    name: "Hana Nakamura",
    avatar: "HN",
    verified: true,
    followers: 21200,
    sales: 10240,
    rating: 4.9,
    bio: "UI kits, design systems, animation.",
    location: "Osaka",
    joined: "2022-02-18",
  },
  {
    id: "c8",
    handle: "cloud-forge",
    name: "CloudForge",
    avatar: "CF",
    verified: true,
    followers: 7820,
    sales: 3120,
    rating: 4.7,
    bio: "Infrastructure-as-code, Terraform modules, K8s helm charts.",
    location: "Dublin",
    joined: "2023-09-12",
    organization: "CloudForge",
  },
];

export type License = "Personal" | "Commercial" | "Enterprise" | "MIT" | "GPL";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  subcategories: string[];
  tags: string[];
  tech: string[];
  price: number;
  originalPrice?: number;
  subscription?: { monthly: number; yearly: number };
  license: License[];
  free: boolean;
  openSource: boolean;
  premium: boolean;
  enterprise: boolean;
  rating: number;
  reviews: number;
  sales: number;
  downloads: number;
  views: number;
  bookmarks: number;
  version: string;
  updatedAt: string;
  createdAt: string;
  creator: string; // creator id
  creatorName?: string;
  creatorAvatar?: string;
  gallery?: string[];
  featured: boolean;
  trending: boolean;
  new: boolean;
  gradient: string; // css gradient for cover
  emoji: string;
};

const gradients = [
  "linear-gradient(135deg, oklch(0.68 0.19 292), oklch(0.66 0.18 250))",
  "linear-gradient(135deg, oklch(0.66 0.18 250), oklch(0.78 0.14 210))",
  "linear-gradient(135deg, oklch(0.72 0.2 340), oklch(0.68 0.19 292))",
  "linear-gradient(135deg, oklch(0.78 0.14 210), oklch(0.72 0.18 152))",
  "linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.72 0.2 340))",
  "linear-gradient(135deg, oklch(0.68 0.19 292), oklch(0.72 0.2 340))",
  "linear-gradient(135deg, oklch(0.4 0.06 265), oklch(0.68 0.19 292))",
  "linear-gradient(135deg, oklch(0.66 0.18 250), oklch(0.4 0.06 265))",
];

const productSeed = [
  {
    name: "Nexus Dashboard Pro",
    tagline: "Enterprise analytics dashboard with 120+ blocks",
    category: "dashboards",
    tech: ["Next.js", "Tailwind", "Recharts", "TypeScript"],
    price: 149,
    emoji: "📊",
  },
  {
    name: "AuthForge",
    tagline: "Drop-in auth for SaaS. Passkeys, SSO, multi-tenant",
    category: "auth",
    tech: ["Node", "Postgres", "Redis"],
    price: 249,
    emoji: "🔐",
  },
  {
    name: "Cortex AI Agent Kit",
    tagline: "Production-ready multi-agent framework",
    category: "ai-agents",
    tech: ["Python", "LangGraph", "OpenAI"],
    price: 399,
    emoji: "🤖",
  },
  {
    name: "Prism UI Kit",
    tagline: "180+ premium components for React",
    category: "ui-kits",
    tech: ["React", "Tailwind", "Radix"],
    price: 89,
    emoji: "💎",
  },
  {
    name: "Voyager SaaS Boilerplate",
    tagline: "Multi-tenant SaaS starter with billing",
    category: "boilerplates",
    tech: ["Next.js", "Stripe", "Prisma"],
    price: 299,
    emoji: "🚀",
  },
  {
    name: "TerraStack",
    tagline: "Terraform modules for AWS multi-region",
    category: "terraform",
    tech: ["Terraform", "AWS"],
    price: 179,
    emoji: "🌍",
  },
  {
    name: "Cursor Master Rules",
    tagline: "500+ curated rules for large codebases",
    category: "cursor-rules",
    tech: ["Cursor"],
    price: 29,
    emoji: "🎯",
  },
  {
    name: "MCP Data Gateway",
    tagline: "Universal MCP server for databases",
    category: "mcp-servers",
    tech: ["MCP", "TypeScript"],
    price: 0,
    emoji: "🔌",
  },
  {
    name: "Iconic 3.0",
    tagline: "4,800 stroke icons perfectly aligned to 24px",
    category: "icons",
    tech: ["SVG", "Figma"],
    price: 49,
    emoji: "✨",
  },
  {
    name: "K8s Production Kit",
    tagline: "Battle-tested helm charts + observability",
    category: "kubernetes",
    tech: ["Kubernetes", "Helm", "Prometheus"],
    price: 349,
    emoji: "☸️",
  },
  {
    name: "Stripe Toolkit",
    tagline: "Full Stripe integration incl. tax, subs, portals",
    category: "stripe",
    tech: ["Stripe", "TypeScript"],
    price: 129,
    emoji: "💳",
  },
  {
    name: "Aurora Landing Pack",
    tagline: "12 conversion-optimized landing templates",
    category: "templates",
    tech: ["Next.js", "Framer Motion"],
    price: 79,
    emoji: "🌌",
  },
  {
    name: "Vault CLI",
    tagline: "Encrypted secrets manager for teams",
    category: "security",
    tech: ["Go", "Rust"],
    price: 199,
    emoji: "🔒",
  },
  {
    name: "Pulse Monitoring",
    tagline: "Real-time app monitoring w/ 30+ integrations",
    category: "monitoring",
    tech: ["Node", "Grafana"],
    price: 219,
    emoji: "💓",
  },
  {
    name: "Framer Studio Pro",
    tagline: "Portfolio + agency Framer templates",
    category: "framer-templates",
    tech: ["Framer"],
    price: 99,
    emoji: "🎨",
  },
  {
    name: "Claude Skills Vault",
    tagline: "300+ Claude skills for engineering teams",
    category: "claude-skills",
    tech: ["Claude"],
    price: 49,
    emoji: "🧠",
  },
  {
    name: "Rustify HTTP",
    tagline: "Blazing fast HTTP framework with async runtime",
    category: "rust",
    tech: ["Rust", "Tokio"],
    price: 0,
    emoji: "🦀",
  },
  {
    name: "Notion for Devs",
    tagline: "Notion clone starter with real-time sync",
    category: "full-systems",
    tech: ["Next.js", "Convex", "Tiptap"],
    price: 349,
    emoji: "📓",
  },
  {
    name: "Neon SDK",
    tagline: "Idiomatic client for the Neon platform",
    category: "sdks",
    tech: ["TypeScript"],
    price: 0,
    emoji: "⚡",
  },
  {
    name: "Figma DS Kit",
    tagline: "Complete design system in Figma",
    category: "figma-kits",
    tech: ["Figma"],
    price: 129,
    emoji: "🎯",
  },
  {
    name: "GitHub Actions Playbook",
    tagline: "40+ reusable workflows for teams",
    category: "github-actions",
    tech: ["GitHub Actions", "YAML"],
    price: 69,
    emoji: "🐙",
  },
  {
    name: "Chrome DevPal",
    tagline: "Ultimate dev toolkit as a Chrome extension",
    category: "chrome-extensions",
    tech: ["Chrome"],
    price: 39,
    emoji: "🌐",
  },
  {
    name: "Odyssey Docs Engine",
    tagline: "MDX docs with search & i18n",
    category: "documentation",
    tech: ["Next.js", "MDX"],
    price: 89,
    emoji: "📚",
  },
  {
    name: "Automate Everything",
    tagline: "200+ workflow templates for n8n & Zapier",
    category: "automation",
    tech: ["n8n", "Zapier"],
    price: 59,
    emoji: "⚙️",
  },
  {
    name: "Firebase Starter Pro",
    tagline: "Fully wired Firebase app with auth & billing",
    category: "firebase",
    tech: ["Firebase", "Next.js"],
    price: 149,
    emoji: "🔥",
  },
  {
    name: "Supabase Multi-Tenant",
    tagline: "Multi-tenant Supabase with RLS templates",
    category: "supabase",
    tech: ["Supabase", "Postgres"],
    price: 199,
    emoji: "⚡",
  },
  {
    name: "Drizzle Kit Pro",
    tagline: "Schema patterns + migrations for scale",
    category: "drizzle",
    tech: ["Drizzle", "Postgres"],
    price: 79,
    emoji: "💧",
  },
  {
    name: "Cloudflare Worker Kit",
    tagline: "Full-stack workers with D1, R2, KV",
    category: "cloudflare",
    tech: ["Cloudflare", "TypeScript"],
    price: 129,
    emoji: "⛅",
  },
  {
    name: "Nexus Mobile",
    tagline: "React Native SaaS app template",
    category: "react-native",
    tech: ["React Native", "Expo"],
    price: 249,
    emoji: "📱",
  },
  {
    name: "Flutter Marketplace Kit",
    tagline: "Complete Flutter marketplace app",
    category: "flutter",
    tech: ["Flutter", "Dart"],
    price: 199,
    emoji: "💙",
  },
  {
    name: "Codex Prompt Library",
    tagline: "800+ engineering prompts for GPT/Claude",
    category: "codex-prompts",
    tech: ["Prompts"],
    price: 39,
    emoji: "📝",
  },
  {
    name: "VSCode Power Pack",
    tagline: "20 productivity extensions bundled",
    category: "vscode-extensions",
    tech: ["VSCode"],
    price: 45,
    emoji: "🎛️",
  },
];

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export const products: Product[] = productSeed.map((p, i) => {
  const rand = seededRandom(i + 1);
  const rating = 4.2 + rand() * 0.8;
  const sales = Math.floor(200 + rand() * 12000);
  return {
    id: `p${i + 1}`,
    slug: p.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    name: p.name,
    tagline: p.tagline,
    description: `${p.tagline}. Built by senior engineers, this product ships with production-grade code, comprehensive documentation, and a permissive license so you can build on it forever. Includes automated tests, CI templates, and Docker images for effortless deployment.`,
    category: p.category,
    subcategories: [p.category],
    tags: p.tech.slice(0, 3),
    tech: p.tech,
    price: p.price,
    originalPrice: p.price > 0 && i % 4 === 0 ? Math.round(p.price * 1.4) : undefined,
    subscription:
      p.price > 100
        ? { monthly: Math.round(p.price / 4), yearly: Math.round(p.price * 2) }
        : undefined,
    license: p.price === 0 ? ["MIT"] : (["Personal", "Commercial", "Enterprise"] as License[]),
    free: p.price === 0,
    openSource: p.price === 0,
    premium: p.price >= 150,
    enterprise: p.price >= 250,
    rating: Math.round(rating * 10) / 10,
    reviews: Math.floor(sales * 0.14),
    sales,
    downloads: sales + Math.floor(rand() * 5000),
    views: sales * 8 + Math.floor(rand() * 20000),
    bookmarks: Math.floor(sales * 0.4),
    version: `${1 + Math.floor(rand() * 4)}.${Math.floor(rand() * 10)}.${Math.floor(rand() * 20)}`,
    updatedAt: new Date(Date.now() - Math.floor(rand() * 60) * 86400000).toISOString(),
    createdAt: new Date(Date.now() - Math.floor(200 + rand() * 600) * 86400000).toISOString(),
    creator: creators[i % creators.length].id,
    featured: i < 6,
    trending: i % 3 === 0,
    new: i % 7 === 0,
    gradient: gradients[i % gradients.length],
    emoji: p.emoji,
  };
});

export function getCreator(id: string) {
  return creators.find((c) => c.id === id) ?? creators[0];
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

// Revenue timeseries used across dashboards
export function generateRevenueSeries(days = 30, base = 200) {
  const rand = seededRandom(42);
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(Date.now() - (days - i - 1) * 86400000);
    return {
      date: date.toISOString().slice(0, 10),
      revenue: Math.floor(base + rand() * base * 3 + i * 8),
      sales: Math.floor(10 + rand() * 40 + i * 0.3),
      visitors: Math.floor(200 + rand() * 800 + i * 5),
    };
  });
}

export const notifications = [
  {
    id: "n1",
    type: "sale",
    title: "New sale: Nexus Dashboard Pro",
    body: "Elena Costa purchased Enterprise License · $499",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    type: "review",
    title: "5-star review on AuthForge",
    body: '"Best auth solution I have ever integrated"',
    time: "18m ago",
    unread: true,
  },
  {
    id: "n3",
    type: "follower",
    title: "Kaito Rivera followed you",
    body: "You now have 24,802 followers",
    time: "1h ago",
    unread: true,
  },
  {
    id: "n4",
    type: "system",
    title: "Payout processed",
    body: "$12,480.00 sent to your bank account",
    time: "3h ago",
    unread: false,
  },
  {
    id: "n5",
    type: "message",
    title: "New message from Prism Agency",
    body: '"Interested in a bundle collaboration?"',
    time: "5h ago",
    unread: false,
  },
  {
    id: "n6",
    type: "update",
    title: "Cortex AI Agent Kit v2.4.0",
    body: "Version published successfully",
    time: "1d ago",
    unread: false,
  },
];

export const reviews = [
  {
    id: "r1",
    author: "Elena Costa",
    avatar: "EC",
    rating: 5,
    date: "2d ago",
    title: "Absolutely worth it",
    body: "Saved us three months of engineering. The code quality is exceptional, the docs are clear, and the maintainer responds within hours.",
    helpful: 42,
  },
  {
    id: "r2",
    author: "Kaito Rivera",
    avatar: "KR",
    rating: 5,
    date: "1w ago",
    title: "Production-ready out of the box",
    body: "Deployed to Vercel in under an hour. Multi-tenant setup just worked. Highly recommend.",
    helpful: 28,
  },
  {
    id: "r3",
    author: "Hana Nakamura",
    avatar: "HN",
    rating: 4,
    date: "2w ago",
    title: "Great foundation",
    body: "Solid architecture. Would love more theming examples but overall a fantastic starting point.",
    helpful: 15,
  },
  {
    id: "r4",
    author: "CloudForge",
    avatar: "CF",
    rating: 5,
    date: "1mo ago",
    title: "Best I have used",
    body: "Compared to five other boilerplates. This one wins on architecture, code style, and maintenance.",
    helpful: 63,
  },
];

export const changelog = [
  {
    version: "2.4.0",
    date: "2026-07-18",
    type: "major",
    changes: [
      "Added multi-region deployment support",
      "New billing portal component",
      "Migrated to Postgres 16",
    ],
  },
  {
    version: "2.3.2",
    date: "2026-06-30",
    type: "patch",
    changes: ["Fixed edge case in session refresh", "Improved TypeScript types for hooks"],
  },
  {
    version: "2.3.0",
    date: "2026-06-14",
    type: "minor",
    changes: [
      "Introduced passkeys support",
      "Added new dashboard theme",
      "Performance improvements",
    ],
  },
  {
    version: "2.2.0",
    date: "2026-05-20",
    type: "minor",
    changes: ["New analytics module", "Improved SEO defaults", "Bug fixes"],
  },
];

export const faqs = [
  {
    q: "What license do I get?",
    a: "You get a perpetual license for the tier you purchase. Commercial and Enterprise tiers include commercial use and unlimited projects.",
  },
  {
    q: "Do I get updates?",
    a: "Yes. All tiers include 12 months of free updates. After that you can renew for 40% of the original price.",
  },
  { q: "Can I get a refund?", a: "We offer a 14-day money-back guarantee, no questions asked." },
  {
    q: "Is support included?",
    a: "Commercial and Enterprise tiers include priority email support. Enterprise adds a private Slack channel.",
  },
];
