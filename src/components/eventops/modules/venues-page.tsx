import { ModuleWorkspace } from "./module-workspace";

export function VenuesPage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="venues" search={search} />;
}
