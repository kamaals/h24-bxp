import React from "react";
import { SidebarNavItem } from "@/components/molecules/sidebar-menu/sidebar-menu";
import { SidebarMenuButton } from "@/components/atoms/sidebar";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/atoms/dropdown-menu";
type Props = {
  item: SidebarNavItem;
};
function DropdownLeaf({ item }: Props) {
  return (
    <DropdownMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={item.url ? item.url : "#"}
          className="flex items-center w-full"
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </DropdownMenuItem>
  );
}

export default DropdownLeaf;
