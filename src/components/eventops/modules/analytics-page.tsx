import { ModuleWorkspace } from "./module-workspace";

export function AnalyticsPage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="analytics" search={search} />;
}
