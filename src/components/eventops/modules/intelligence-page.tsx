import { ModuleWorkspace } from "./module-workspace";

export function IntelligencePage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="intelligence" search={search} />;
}
