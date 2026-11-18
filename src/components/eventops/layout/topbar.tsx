import type { Dispatch, SetStateAction } from "react";
import { ChevronDown, ChevronRight, Bell, Menu, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TopbarProps = {
  title: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  notificationsOpen: boolean;
  setNotificationsOpen: Dispatch<SetStateAction<boolean>>;
};

export function Topbar({ title, search, setSearch, setMobileOpen, notificationsOpen, setNotificationsOpen }: TopbarProps) {
  return (
    <>
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-sm md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span>Workspace</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{title}</span>
            </div>

            <div className="sm:hidden truncate text-sm font-semibold">
              {title}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <label className="relative hidden w-[min(32vw,270px)] md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workspace"
                aria-label="Search workspace"
                className="h-9 pl-9 pr-12 text-xs"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border px-1 text-[9px] text-muted-foreground">
                ⌘ K
              </kbd>
            </label>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Search"
              onClick={() => {
                document.getElementById("mobile-search")?.focus();
              }}
            >
              <Search className="h-4 w-4" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                onClick={() => setNotificationsOpen((v) => !v)}
                className="relative"
              >
                <Bell className="h-[17px] w-[17px]" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
              </Button>

              {notificationsOpen && (
                <div className="absolute right-0 top-11 z-50 w-[min(340px,calc(100vw-32px))] rounded-md border border-border bg-popover p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                    <button
                      className="text-xs text-muted-foreground"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <p className="border-l-2 border-primary pl-3 leading-relaxed">
                      <b>Budget review due</b>
                      <span className="block text-muted-foreground">
                      Mumbai Diwali Leadership Summit · 2 approvals await you
                      </span>
                    </p>
                    <p className="border-l-2 border-chart-2 pl-3 leading-relaxed">
                      <b>Vendor confirmed</b>
                      <span className="block text-muted-foreground">
                        Bengaluru Innovation Forum · Aangan Hospitality
                      </span>
                    </p>
                    <p className="border-l-2 border-border pl-3 leading-relaxed">
                      <b>New floor plan uploaded</b>
                      <span className="block text-muted-foreground">
                        Mumbai Diwali Leadership Summit · 2 hours ago
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 px-1.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-[10px] font-semibold">
                    MS
                  </span>
                  <span className="hidden text-xs font-medium lg:block">
                    Meera Shah
                  </span>
                  <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground lg:block" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Meera Shah · Owner</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => toast.success("Profile opened")}
                >
                  My profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.success("Preferences opened")}
                >
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    toast.success("Sign-in is simulated in this prototype")
                  }
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Input
          id="mobile-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workspace"
          aria-label="Search workspace"
          className="m-4 w-[calc(100%-2rem)] md:hidden"
        />

    </>
  );
}
