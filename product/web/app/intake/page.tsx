import { getFinderResources } from "@/lib/data";
import { categoriesOffered } from "@/lib/match";
import { IntakeForm } from "./intake-form";

export default async function IntakePage() {
  return <IntakeForm offered={categoriesOffered(await getFinderResources())} />;
}
