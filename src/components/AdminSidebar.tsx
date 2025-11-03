import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  title: string;
  url: string;
  icon: any;
  roles: string[];
  badge?: number;
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, roles: ['admin', 'editor', 'moderator'] },
  { title: "Users", url: "/admin/users", icon: Users, roles: ['admin'] },
  { title: "Products", url: "/admin/products", icon: Package, roles: ['admin'] },
  { title: "Plans", url: "/admin/plans", icon: CreditCard, roles: ['admin'] },
  { title: "Blog Posts", url: "/admin/blog", icon: FileText, roles: ['admin', 'editor'] },
  { title: "Community", url: "/admin/community", icon: MessageSquare, roles: ['admin', 'editor', 'moderator'], badge: 3 },
  { title: "Settings", url: "/admin/settings", icon: Settings, roles: ['admin'] },
];

export function AdminSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  // Mock current user role - in production, get from auth context
  const currentUserRole = 'admin';

  const filteredItems = menuItems.filter(item => 
    item.roles.includes(currentUserRole)
  );

  const isActive = (path: string) => {
    if (path === "/admin") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
      : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-6">
            {open ? "Currently Natty Admin" : "CN"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavCls(item.url)}>
                    <NavLink to={item.url} end={item.url === "/admin"}>
                      <item.icon className="h-4 w-4" />
                      {open && (
                        <div className="flex items-center justify-between w-full">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="destructive" className="ml-2">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-destructive hover:text-destructive-foreground">
                  <NavLink to="/">
                    <LogOut className="h-4 w-4" />
                    {open && <span>Exit Admin</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
