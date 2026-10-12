import { redirect } from "next/navigation";
import { authMode, getUser } from "@/lib/auth";
import { DEMO_USERS, ROLE_LABELS } from "@/lib/auth/users";
import { signInDemo, signInWithChurchAccount } from "./actions";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  if (await getUser()) redirect("/");
  const showDemo = authMode === "demo" && (await searchParams).demo === "1";

  return (
    <div className="space-y-8 pt-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold leading-tight">Sign in</h1>
        <p className="text-muted">
          For bishops, Relief Society presidents, and upkeep volunteers.
        </p>
      </section>

      {!showDemo ? (
        <form action={signInWithChurchAccount}>
          <button
            type="submit"
            className="flex min-h-14 w-full items-center justify-center rounded-2xl border border-border bg-surface px-6 text-base font-semibold shadow-sm hover:border-muted"
          >
            Sign in with Church Account
          </button>
        </form>
      ) : (
        <section className="space-y-3">
          <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Demo sign-in.</strong> Real Church Account sign-in will replace this once
            the Church approves the app. Pick who you want to be:
          </div>
          {DEMO_USERS.map((u) => (
            <form key={u.id} action={signInDemo}>
              <input type="hidden" name="userId" value={u.id} />
              <button
                type="submit"
                className="flex min-h-16 w-full flex-col items-start justify-center rounded-2xl border-2 border-border bg-surface px-4 text-left hover:border-primary"
              >
                <span className="font-semibold">{u.name}</span>
                <span className="text-sm text-muted">
                  {ROLE_LABELS[u.role]}
                  {u.role === "upkeep" ? ": finder + monthly calls" : ": finder"}
                </span>
              </button>
            </form>
          ))}
        </section>
      )}
    </div>
  );
}
