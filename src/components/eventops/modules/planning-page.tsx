import { ModuleWorkspace } from "./module-workspace";

export function PlanningPage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="planning" search={search} />;
}
