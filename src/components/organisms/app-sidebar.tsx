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
} from "@/components/atoms/sidebar";
import { usePathname } from "next/navigation";

import SidebarMainMenu from "@/components/molecules/sidebar-menu/sidebar-menu";

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
      {
        title: "Categories",
        url: "#",
        icon: User,
        isActive:
          pathname === "/dashboard/category" ||
          pathname === "/dashboard/category",
        items: [
          {
            icon: List,
            title: "List",
            url: "/dashboard/category",
            isActive: pathname === "/dashboard/category",
          },
          {
            icon: Plus,
            title: "New Category",
            url: "/dashboard/category/new",
            isActive: pathname === "/dashboard/category/new",
          },
        ],
      },
    ];
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>Hello</SidebarHeader>
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
