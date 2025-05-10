import React from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/molecules/sidebar";
import { SidebarNavItem } from "@/components/molecules/sidebar-menu/sidebar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
type Props = {
  item: SidebarNavItem;
};

export const verticalLIne =
  "relative before:border-zinc-300 vertical-line before:absolute before:left-1 before:-top-0 before:h-full before:w-2 before:border-l before:z-100 [&:last-child]:before:h-4";

export const horizontalLIne =
  "relative horizontal-line after:border-zinc-300 after:absolute after:left-1 after:top-4 after:bottom-4 after:w-3 after:h-[1px] after:border-b after:z-100";

function Leaf({ item }: Props) {
  return (
    <SidebarMenuItem
      className={cn(
        horizontalLIne,
        verticalLIne,
        "pl-2",
        item.isActive && "bg-zinc-100",
      )}
    >
      <SidebarMenuButton asChild>
        <Link
          href={item.url ? item.url : "#"}
          className="flex items-center w-full"
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default Leaf;
