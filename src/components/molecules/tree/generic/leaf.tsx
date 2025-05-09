import {
  TreeDataItem,
  LeafProps,
  treeVariants,
  selectedTreeVariants,
  TitleLeafProps,
} from "./index";
import React from "react";
import TreeIcon from "./icon";
import TreeActions from "./actions";
import { cn } from "@/lib/utils";

export const LeafComponent = React.forwardRef(function LeafComponent<
  DataItem extends TreeDataItem,
>(
  {
    className,
    data,
    selectedItemId,
    handleSelectChange,
    defaultLeafIcon,
    actions,
    ...props
  }: LeafProps<DataItem> & React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div className="ml-5 h-10 border rounded-lg bg-zinc-50 flex text-left items-center p-2">
      <div
        data-testid={`tree-leaf-${data.id}`}
        ref={ref}
        className={cn(
          "flex flex-1 items-center cursor-pointer relative",
          treeVariants(),
          className,
          selectedItemId === data.id && selectedTreeVariants(),
        )}
        onClick={() => {
          handleSelectChange?.(data);
          data.onClick?.(data);
        }}
        {...props}
      >
        <TreeIcon
          data={data}
          isSelected={selectedItemId === data.id}
          default={defaultLeafIcon}
        />
        <span
          className={cn(
            "flex-grow text-sm truncate",
            selectedItemId === data.id ? "relative z-20" : "",
          )}
        >
          {data.name}
        </span>
      </div>
      <TreeActions isSelected={selectedItemId === data.id} id={data.id}>
        {actions}
      </TreeActions>
    </div>
  );
});

export function TitleLeafComponent<DataItem extends TreeDataItem>({
  className,
  data,
}: TitleLeafProps<DataItem> & { className?: string }) {
  return (
    <div
      className={cn(
        "text-sm truncate relative z-20 bg-zinc-50 h-10 border-b border-t flex items-center",
        className,
      )}
    >
      <span>{data.name}</span>
    </div>
  );
}
