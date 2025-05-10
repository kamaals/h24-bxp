import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/atoms/dropdown-menu";
import { SidebarNavItem } from "@/components/molecules/sidebar-menu/sidebar-menu";
import { SidebarMenuButton } from "@/components/molecules/sidebar";
import { cn } from "@/lib/utils";
// Function to recursively render menu items
const renderMenuItems = (items: SidebarNavItem[]) => {
  return items.map((item, index) => {
    // If the item has children, render a submenu
    if (item.items && item.items.length > 0) {
      return (
        <DropdownMenuSub key={index}>
          <DropdownMenuSubTrigger className={item.isActive ? "bg-accent" : ""}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {renderMenuItems(item.items)}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      );
    }

    // Otherwise, render a regular menu item
    return (
      <DropdownMenuItem
        key={index}
        className={item.isActive ? "bg-accent" : ""}
      >
        <SidebarMenuButton key={`li-${index}`} asChild>
          <Link href={item.url ?? "#"} className="flex items-center w-full">
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </DropdownMenuItem>
    );
  });
};

// Main component for generating dropdown menus
export const DynamicDropdownMenu = ({ data }: { data: SidebarNavItem[] }) => {
  return (
    <div
      className={cn(
        'group-data-[state="expanded"]:hidden',
        "flex flex-col space-y-1",
      )}
    >
      {data.map((menuItem, index) => {
        // If this is a top-level item with no children, render a simple button
        if (!menuItem.items || menuItem.items.length === 0) {
          return (
            <SidebarMenuButton tooltip={undefined} key={`li-${index}`} asChild>
              <Link
                href={menuItem.url ? menuItem.url : "#"}
                className="flex items-center w-full"
              >
                {menuItem.icon && <menuItem.icon />}
              </Link>
            </SidebarMenuButton>
          );
        }

        // Otherwise render a dropdown
        return (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton tooltip={undefined} asChild>
                <Link
                  href={menuItem.url ?? "#"}
                  className="flex items-center w-full"
                >
                  {menuItem.icon && <menuItem.icon />}
                </Link>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align={"start"}>
              <DropdownMenuLabel>{menuItem.title}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {renderMenuItems(menuItem.items)}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
};
