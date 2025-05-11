import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/molecules/sidebar";

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

function SidebarMainMenu({ label }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <CategoriesTree />
    </SidebarGroup>
  );
}

export default SidebarMainMenu;
