import React from "react";
import type { LucideIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel } from "@/components/atoms/sidebar";
import MenuItem from "@/components/molecules/sidebar-menu/menu-item";
import { DynamicDropdownMenu } from "@/components/molecules/sidebar-menu/sidebar-dropdown";

export type SidebarNavItem = {
  title?: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SidebarNavItem[];
};

export type Props = {
  items?: Array<SidebarNavItem>;
  label: string;
};

function SidebarMainMenu({ label, items }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <MenuItem level={0} items={items ? items : []} />
      <DynamicDropdownMenu data={items ?? []} />
    </SidebarGroup>
  );
}

export default SidebarMainMenu;
