import { ModuleWorkspace } from "./module-workspace";

export function VendorsPage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="vendors" search={search} />;
}
