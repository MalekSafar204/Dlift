import { getCranes } from "@/lib/services";
import CranesDashboard from "./cranesDashboard";

export default async function AdminCranesPage() {
  const cranes = await getCranes();
  return <CranesDashboard initialCranes={cranes} />;
}
