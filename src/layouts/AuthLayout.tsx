import { AppSidebar } from "@/components/App-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full">
        <AppSidebar />
        <main className="p-2">
          <SidebarTrigger
            className=" fixed top-2 left-4 "
            variant={"outline"}
            size={"icon-lg"}
          />
          <section className="mt-12">
            <Outlet />
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}
