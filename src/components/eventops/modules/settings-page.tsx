import { ModuleWorkspace } from "./module-workspace";

export function SettingsPage({ search = "" }: { search?: string }) {
  return <ModuleWorkspace module="settings" search={search} />;
}
