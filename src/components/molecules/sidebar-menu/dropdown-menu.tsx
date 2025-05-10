import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import Link from "next/link";
import { SidebarMenuButton } from "@/components/molecules/sidebar";
import { SidebarNavItem } from "@/components/molecules/sidebar-menu/sidebar-menu";

import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { List, Mail, Plus, UserPlus } from "lucide-react";

type Props = {
  level: number;
  item: SidebarNavItem;
} & DropdownMenuProps &
  React.HTMLAttributes<HTMLDivElement>;

function SidebarDropdownMenu({ item, className, ...props }: Props) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger className={cn(className)} asChild>
        <SidebarMenuButton tooltip={"Menu"}>
          <Link
            href={item.url ? item.url : "#"}
            className="flex items-center w-full"
          >
            {item.icon && <item.icon />}
          </Link>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"start"} className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <List />
            <span>User</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus />
            <span>User</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SidebarDropdownMenu;
