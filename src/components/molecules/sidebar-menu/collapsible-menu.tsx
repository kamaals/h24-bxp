import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/atoms/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/atoms/collapsible";
import { ChevronRight } from "lucide-react";
import { SidebarNavItem } from "@/components/molecules/sidebar-menu/sidebar-menu";
import MenuItem from "@/components/molecules/sidebar-menu/menu-item";
import { cn } from "@/lib/utils";
import {
  horizontalLIne,
  verticalLIne,
} from "@/components/molecules/sidebar-menu/leaf";

type Props = {
  level: number;
  item: SidebarNavItem;
} & React.HTMLAttributes<HTMLDivElement>;

function CollapsibleMenu({ item, level, className, ...props }: Props) {
  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className={cn(`group/collapsible${level}`, className)}
      {...props}
    >
      <SidebarMenuItem className={cn(horizontalLIne, verticalLIne, "pl-2")}>
        <CollapsibleTrigger
          asChild
          className={cn('group-data-[state="collapsed"]:hidden')}
        >
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight
              className={cn(
                `ml-auto transition-transform duration-200 group-data-[state=open]/collapsible${level}:rotate-90`,
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent
          className={cn(
            `group/collapsible${level}-content`,
            "ml-3",
            'group-data-[state="collapsed"]:hidden',
          )}
        >
          <MenuItem level={level + 1} items={item.items ? item.items : item} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default CollapsibleMenu;
