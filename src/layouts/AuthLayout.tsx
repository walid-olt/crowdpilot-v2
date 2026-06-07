import { AppSidebar } from "@/components/App-sidebar";
import Loading from "@/components/Loading";
import NavigationLoading from "@/components/NavigationLoading";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <NavigationLoading />
      <div className="min-h-screen w-full">
        <AppSidebar />
        <main className="p-2">
          <SidebarTrigger
            className=" fixed  inset-1"
            variant={"outline"}
            size={"icon-lg"}
          />
          <section className="mt-12">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}
