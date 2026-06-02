import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
  SidebarTrigger,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  LayoutDashboard,
  User,
  Power,
  Wallet,
  FolderKanban,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { useLogout } from "@/features/auth/hooks";

type NavLinkItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

const baseLinks: NavLinkItem[] = [
  { name: "Dashboard", path: "dashboard", icon: LayoutDashboard },
  { name: "Projects", path: "projects", icon: Briefcase },
];
const roleLinks: Record<string, NavLinkItem[]> = {
  INVESTOR: [
    { name: "Wallet", path: "wallet", icon: Wallet },
    { name: "Portfolio", path: "portfolio", icon: FolderKanban },
  ],
};

export function AppSidebar() {
  const user = useAppSelector((state) => state.auth.user);
  const { state, setOpen } = useSidebar();

  const logout = useLogout();
  if (!user) return null; // just in case, but ideally this component shouldn't render if there's no user
  const { email, role, name, balance } = user;

  const links = [...baseLinks, ...(roleLinks[role] ?? [])];

  return (
    <Sidebar onPointerLeave={() => setOpen(false)}>
      <SidebarHeader className={cn("border-b border-border/50 flex  ")}>
        <div className="flex justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            {state === "expanded" && (
              <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/50">
                Crowdpilot
              </span>
            )}
          </NavLink>

          <SidebarTrigger size="icon-lg" />
        </div>{" "}
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.name}>
              <NavLink to={link.path}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    size={"lg"}
                    isActive={isActive}
                    className={`w-full justify-start rounded-none! ${isActive ? "text-primary! bg-primary-foreground! " : ""} `}
                  >
                    <link.icon className="size-4 mr-2" />
                    {link.name}
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-auto p-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="shrink-0">
              <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                <User className="size-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <p className="font-semibold text-sm truncate">{name}</p>
                <Badge
                  variant="outline"
                  className="h-5 px-2 text-[10px] capitalize"
                >
                  {role}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate">{email}</span>
                {balance && (
                  <span className="ml-2 shrink-0 font-medium text-foreground">
                    ${balance.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50">
        <Button
          variant="ghost"
          size={"lg"}
          className="w-full justify-start"
          onClick={logout}
        >
          <Power className="size-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
