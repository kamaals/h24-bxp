import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/molecules/sidebar";
import MenuItem from "@/components/molecules/sidebar-menu/menu-item";
import CategoriesTree from "@/components/molecules/tree/categories-tree";

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
      <CategoriesTree />
    </SidebarGroup>
  );
}

export default SidebarMainMenu;
