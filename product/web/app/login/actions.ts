"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authMode } from "@/lib/auth";
import { startChurchSignIn } from "@/lib/auth/church-account";
import { encodeSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth/session";
import { findDemoUser } from "@/lib/auth/users";

export async function signInWithChurchAccount() {
  if (authMode === "church") startChurchSignIn();
  redirect("/login?demo=1");
}

export async function signInDemo(formData: FormData) {
  if (authMode !== "demo") throw new Error("Demo sign-in is turned off.");
  const user = findDemoUser(String(formData.get("userId")));
  if (!user) redirect("/login?demo=1");

  (await cookies()).set(SESSION_COOKIE, encodeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect(user.role === "upkeep" ? "/upkeep" : "/");
}

export async function signOut() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}
