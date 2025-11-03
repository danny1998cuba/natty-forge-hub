import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center px-4 bg-background sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex items-center gap-2">
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              <span className="text-sm text-muted-foreground">/ Management Portal</span>
            </div>
          </header>
          <main className="flex-1 p-6 bg-muted/40">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
