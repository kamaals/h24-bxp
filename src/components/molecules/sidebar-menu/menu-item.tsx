import React from "react";
import { SidebarNavItem } from "@/components/molecules/sidebar-menu/sidebar-menu";
import CollapsibleMenu from "@/components/molecules/sidebar-menu/collapsible-menu";
import Leaf from "@/components/molecules/sidebar-menu/leaf";
import { SidebarMenu } from "@/components/atoms/sidebar";
import { cn } from "@/lib/utils";

type Props = {
  items: Array<SidebarNavItem> | SidebarNavItem;
  level: number;
};

function MenuItem({ items, level }: Props) {
  if (!(items instanceof Array)) {
    items = [items];
  }
  return (
    <SidebarMenu className={cn('group-data-[state="collapsed"]:hidden')}>
      {(items || []).map((item, index: number) =>
        item.items && item.items.length > 0 ? (
          <CollapsibleMenu level={level} item={item} key={"ul-coll-" + index} />
        ) : (
          <Leaf item={item} key={"li-" + item.title + index} />
        ),
      )}
    </SidebarMenu>
  );
}

export default MenuItem;
