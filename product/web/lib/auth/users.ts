export type Role = "official" | "upkeep";

export type User = {
  id: string;
  name: string;
  role: Role;
  /** Shown under the name in the header. */
  title: string;
};

export const ROLE_LABELS: Record<Role, string> = {
  official: "Church official",
  upkeep: "Upkeep",
};

// DEMO ONLY: stand-in accounts until Church Account sign-in decides who is who.
export const DEMO_USERS: User[] = [
  { id: "demo-bishop", name: "Bishop (demo)", role: "official", title: "Church official" },
  {
    id: "demo-rs-president",
    name: "Relief Society president (demo)",
    role: "official",
    title: "Church official",
  },
  { id: "demo-upkeep", name: "Upkeep volunteer (demo)", role: "upkeep", title: "Monthly upkeep calls" },
];

export function findDemoUser(id: string): User | null {
  return DEMO_USERS.find((u) => u.id === id) ?? null;
}
