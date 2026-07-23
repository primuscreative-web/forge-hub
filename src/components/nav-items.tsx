import {
  LayoutDashboard,
  Package,
  BarChart3,
  DollarSign,
  Users,
  MessageSquare,
  Star,
  FileText,
  Settings,
  ShieldCheck,
  Bell,
  Award,
} from "lucide-react";
import type { SideNavItem } from "./side-nav";

export const creatorNav: SideNavItem[] = [
  { label: "Overview", to: "/creator", icon: <LayoutDashboard />, group: "Workspace" },
  { label: "Products", to: "/creator/products", icon: <Package />, group: "Workspace" },
  { label: "Settings", to: "/settings", icon: <Settings />, group: "Profile" },
];

export const buyerNav: SideNavItem[] = [
  { label: "Library", to: "/dashboard", icon: <Package />, group: "Shop" },
  { label: "Purchases", to: "/dashboard/purchases", icon: <FileText />, group: "Shop" },
  { label: "Wishlist", to: "/dashboard/wishlist", icon: <Star />, group: "Shop" },
  { label: "Bookmarks", to: "/dashboard/bookmarks", icon: <Star />, group: "Shop" },
  { label: "Collections", to: "/dashboard/collections", icon: <LayoutDashboard />, group: "Shop" },
  { label: "Following", to: "/dashboard/following", icon: <Users />, group: "Social" },
  { label: "Messages", to: "/dashboard/messages", icon: <MessageSquare />, group: "Social" },
  {
    label: "Notifications",
    to: "/dashboard/notifications",
    icon: <Bell />,
    badge: 3,
    group: "Social",
  },
  { label: "Subscriptions", to: "/dashboard/subscriptions", icon: <FileText />, group: "Account" },
  { label: "Licenses", to: "/dashboard/licenses", icon: <ShieldCheck />, group: "Account" },
  { label: "Support", to: "/dashboard/support", icon: <MessageSquare />, group: "Account" },
  { label: "Settings", to: "/settings", icon: <Settings />, group: "Account" },
];

export const adminNav: SideNavItem[] = [
  { label: "Dashboard", to: "/admin", icon: <LayoutDashboard />, group: "Overview" },
  { label: "Users", to: "/admin/users", icon: <Users />, group: "People" },
  { label: "Creators", to: "/admin/creators", icon: <Award />, group: "People" },
  { label: "Organizations", to: "/admin/organizations", icon: <ShieldCheck />, group: "People" },
  { label: "Products", to: "/admin/products", icon: <Package />, badge: 12480, group: "Catalog" },
  { label: "Categories", to: "/admin/categories", icon: <LayoutDashboard />, group: "Catalog" },
  { label: "Reviews", to: "/admin/reviews", icon: <Star />, group: "Catalog" },
  { label: "Orders", to: "/admin/orders", icon: <FileText />, group: "Commerce" },
  { label: "Revenue", to: "/admin/revenue", icon: <DollarSign />, group: "Commerce" },
  { label: "Subscriptions", to: "/admin/subscriptions", icon: <FileText />, group: "Commerce" },
  { label: "Coupons", to: "/admin/coupons", icon: <FileText />, group: "Commerce" },
  {
    label: "Support tickets",
    to: "/admin/tickets",
    icon: <MessageSquare />,
    badge: 24,
    group: "Support",
  },
  { label: "Reports", to: "/admin/reports", icon: <FileText />, badge: 8, group: "Support" },
  { label: "Moderation", to: "/admin/moderation", icon: <ShieldCheck />, group: "Trust & safety" },
  { label: "Audit logs", to: "/admin/audit", icon: <FileText />, group: "Trust & safety" },
  { label: "Analytics", to: "/admin/analytics", icon: <BarChart3 />, group: "System" },
  { label: "Feature flags", to: "/admin/flags", icon: <Settings />, group: "System" },
  { label: "Settings", to: "/admin/settings", icon: <Settings />, group: "System" },
];

export const settingsNav: SideNavItem[] = [
  { label: "General", to: "/settings", icon: <Settings /> },
  { label: "Appearance", to: "/settings/appearance", icon: <LayoutDashboard /> },
  { label: "Notifications", to: "/settings/notifications", icon: <Bell /> },
  { label: "Security", to: "/settings/security", icon: <ShieldCheck /> },
  { label: "Billing", to: "/settings/billing", icon: <DollarSign /> },
  { label: "API keys", to: "/settings/api-keys", icon: <FileText /> },
  { label: "Organization", to: "/settings/organization", icon: <Users /> },
  { label: "Connected accounts", to: "/settings/connected", icon: <Package /> },
];
