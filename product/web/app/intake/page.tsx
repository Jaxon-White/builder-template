import { getFinderResources } from "@/lib/data";
import { categoriesOffered, servesImmigrants } from "@/lib/match";
import { IntakeForm } from "./intake-form";

export default async function IntakePage() {
  const all = await getFinderResources();
  return <IntakeForm offered={categoriesOffered(all)} immigrants={servesImmigrants(all)} />;
}
