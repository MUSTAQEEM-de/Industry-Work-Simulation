"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { History, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Logo } from "./icons";
import { Button } from "./ui/button";

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/history",
    label: "History",
    icon: History,
  },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-sidebar-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">
            SimuWork
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Button
                asChild
                variant={pathname.startsWith(item.href) ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="text-sidebar-foreground" />
      </SidebarFooter>
    </Sidebar>
  );
}

// Re-exporting for use in the layout
export { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
