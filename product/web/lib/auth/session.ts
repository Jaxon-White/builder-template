import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { User } from "./users";

export const SESSION_COOKIE = "fh_session";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

// Same cookie format whichever sign-in method created it (demo now, Church Account later).
type SessionPayload = { user: User; exp: number };

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (s) return s;
  if (process.env.AUTH_MODE === "church") {
    throw new Error("AUTH_SECRET must be set when AUTH_MODE=church.");
  }
  return "demo-only-secret-not-for-real-use";
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

export function encodeSession(user: User): string {
  const payload: SessionPayload = { user, exp: Date.now() + SESSION_MAX_AGE * 1000 };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function decodeSession(value: string | undefined): User | null {
  if (!value) return null;
  const [data, sig] = value.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(sign(data));
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as SessionPayload;
    return payload.exp > Date.now() ? payload.user : null;
  } catch {
    return null;
  }
}
