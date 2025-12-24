import {
  MainSidebar,
  SidebarProvider,
  SidebarInset,
} from "@/components/main-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <div className="min-h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
