import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  role: "buyer" | "creator" | "admin";
  status: "active" | "disabled";
  emailVerifiedAt: string | null;
  createdAt: string;
};

type AuthResult = { ok: true } | { ok: false; message: string };
type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, displayName: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const creatorPrivateRoutes = new Set([
  "creator",
  "creator/achievements",
  "creator/analytics",
  "creator/customers",
  "creator/licenses",
  "creator/messages",
  "creator/products",
  "creator/revenue",
  "creator/reviews",
  "creator/subscriptions",
  "creator/withdrawals",
]);

export function isPrivatePath(pathname: string) {
  const normalized = pathname.replace(/^\/+|\/+$/g, "");
  return (
    normalized === "publish" ||
    normalized === "dashboard" ||
    normalized.startsWith("dashboard/") ||
    normalized === "settings" ||
    normalized.startsWith("settings/") ||
    normalized === "admin" ||
    normalized.startsWith("admin/") ||
    creatorPrivateRoutes.has(normalized)
  );
}

async function authRequest(path: string, init?: RequestInit) {
  return fetch(`${API_BASE_URL}/auth/${path}`, {
    ...init,
    credentials: "include",
    headers: { "content-type": "application/json", ...init?.headers },
  });
}

async function resultMessage(response: Response) {
  try {
    const body = (await response.json()) as { error?: { message?: string } };
    return body.error?.message ?? "Unable to complete authentication";
  } catch {
    return "Unable to complete authentication";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    authRequest("me")
      .then(async (response) => {
        if (!active || !response.ok) return;
        const body = (await response.json()) as { user: AuthUser };
        setUser(body.user);
      })
      .catch(() => undefined)
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loading || user || typeof window === "undefined" || !isPrivatePath(pathname)) return;
    const destination = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.location.replace(`/auth?redirect=${encodeURIComponent(destination)}`);
  }, [loading, pathname, user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async login(email, password) {
      try {
        const response = await authRequest("login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) return { ok: false, message: await resultMessage(response) };
        const body = (await response.json()) as { user: AuthUser };
        setUser(body.user);
        return { ok: true };
      } catch {
        return { ok: false, message: "Authentication service unavailable" };
      }
    },
    async register(email, password, displayName) {
      try {
        const response = await authRequest("register", {
          method: "POST",
          body: JSON.stringify({ email, password, displayName }),
        });
        if (!response.ok) return { ok: false, message: await resultMessage(response) };
        const body = (await response.json()) as { user: AuthUser };
        setUser(body.user);
        return { ok: true };
      } catch {
        return { ok: false, message: "Authentication service unavailable" };
      }
    },
    async logout() {
      try {
        await authRequest("logout", { method: "POST", body: "{}" });
      } finally {
        setUser(null);
        if (typeof window !== "undefined") window.location.assign("/auth");
      }
    },
  }), [loading, user]);

  if (isPrivatePath(pathname) && (loading || !user)) {
    return <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading account…</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
