import { ModuleWorkspace } from "./module-workspace";

export function DocumentsPage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="documents" search={search} />;
}
