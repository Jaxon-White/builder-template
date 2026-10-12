import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { decodeSession, SESSION_COOKIE } from "./session";
import type { Role, User } from "./users";

export type { Role, User } from "./users";

export const authMode = process.env.AUTH_MODE === "church" ? "church" : "demo";

/** The signed-in user, or null. Verifies the cookie signature on every call. */
export const getUser = cache(async (): Promise<User | null> => {
  return decodeSession((await cookies()).get(SESSION_COOKIE)?.value);
});

export async function requireUser(): Promise<User> {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRole(role: Role): Promise<User> {
  const user = await requireUser();
  if (user.role !== role) redirect("/?denied=1");
  return user;
}
