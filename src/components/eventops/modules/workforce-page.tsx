import { ModuleWorkspace } from "./module-workspace";

export function WorkforcePage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="workforce" search={search} />;
}
