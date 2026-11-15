import { ModuleWorkspace } from "./module-workspace";

export function LiveOperationsPage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="live-operations" search={search} />;
}
