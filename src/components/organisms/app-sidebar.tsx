"use client";
import * as React from "react";
import { NavUser } from "@/components/molecules/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/molecules/sidebar";
import SidebarMainMenu from "@/components/molecules/sidebar-menu/sidebar-menu";
import Logout from "@/components/molecules/auth/logout";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logout />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainMenu label="" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
