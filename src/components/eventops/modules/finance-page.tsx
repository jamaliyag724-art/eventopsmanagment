import { ModuleWorkspace } from "./module-workspace";

export function FinancePage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="finance" search={search} />;
}
