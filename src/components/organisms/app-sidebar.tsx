"use client";

import * as React from "react";
import { User, Home, Plus, List } from "lucide-react";
import { NavUser } from "@/components/molecules/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/molecules/sidebar";
import { usePathname } from "next/navigation";

import SidebarMainMenu from "@/components/molecules/sidebar-menu/sidebar-menu";
import CategoriesTree from "@/components/molecules/tree/categories-tree";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMain = React.useMemo(() => {
    return [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isActive: pathname === "/",
      },
    ];
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarMainMenu items={navMain} label="Menu" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
