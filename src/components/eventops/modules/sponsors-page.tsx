import { ModuleWorkspace } from "./module-workspace";

export function SponsorsPage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="sponsors" search={search} />;
}
