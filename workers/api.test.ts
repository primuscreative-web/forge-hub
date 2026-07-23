import assert from "node:assert/strict";
import test from "node:test";

import worker from "./api";
import { isPrivatePath } from "../src/lib/auth";

type Row = Record<string, unknown>;

class FakeDB {
  users: Row[] = [];
  sessions: Row[] = [];

  prepare(sql: string) {
    let values: unknown[] = [];
    const statement = {
      bind: (...input: unknown[]) => {
        values = input;
        return statement;
      },
      all: async () => ({ results: [] as Row[] }),
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
    return null;
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
    }
  }
}

const origin = "https://forge-hub-nine.vercel.app";
const env = (db = new FakeDB()) => ({
  DB: db,
  ALLOWED_ORIGINS: origin,
  ENVIRONMENT: "cross-site-preview",
});

let requestSequence = 0;
function request(path: string, body?: Row, cookie?: string) {
  requestSequence += 1;
  return new Request(`https://api.test${path}`, {
    method: body ? "POST" : "GET",
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
