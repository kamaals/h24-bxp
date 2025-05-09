import React from "react";
import {
  horizontalLIne,
  TreeDataItem,
  TreeItemProps,
  verticalLIne,
} from "./index";
import { LeafComponent } from "./leaf";
import Node from "./node";
import { cn } from "@/lib/utils";

function TreeItem<DataItem extends TreeDataItem>({
  className,
  data,
  leaf,
  selectedItemId,
  handleSelectChange,
  expandedItemIds,
  defaultLeafIcon,
  defaultNodeIcon,
  titleLeaf,
  actions,
  ref,
  ...props
}: TreeItemProps<DataItem> &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  }) {
  const Leaf = leaf ? leaf : LeafComponent;
  /* istanbul ignore if @preserve */
  if (!(data instanceof Array)) {
    data = [data];
  }

  return (
    <div ref={ref} className={cn(className)} {...props}>
      <ul>
        {(data || []).map((item) =>
          item ? (
            <li
              key={item?.id}
              className={cn(
                horizontalLIne,
                item?.children ? "" : "after:w-4",
                verticalLIne,
                "pt-2",
              )}
            >
              {Array.isArray(item?.children) && item.children.length ? (
                <Node<DataItem>
                  actions={actions}
                  leaf={leaf}
                  titleLeaf={titleLeaf}
                  data={item}
                  selectedItemId={selectedItemId}
                  expandedItemIds={expandedItemIds}
                  handleSelectChange={handleSelectChange}
                  defaultNodeIcon={defaultNodeIcon}
                  defaultLeafIcon={defaultLeafIcon}
                />
              ) : (
                <Leaf
                  actions={actions} // This is not defined in this file
                  defaultLeafIcon={defaultLeafIcon}
                  // @ts-expect-error: signature mismatch
                  handleSelectChange={handleSelectChange}
                  data={item}
                  selectedItemId={selectedItemId}
                />
              )}
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
}

export default TreeItem;
