// Base data type
import React from "react";
import { cva } from "class-variance-authority";
import { useTree } from "@/lib/hooks/use-tree";
import TreeItem from "./tree-item";

export interface TreeDataItem {
  id: string;
  name: string;
  children?: Array<this>;
  onClick?: (item: this | undefined) => void;
  icon?: unknown;
  selectedIcon?: unknown;
  openIcon?: unknown;
}

export type LeafProps<DataItem extends TreeDataItem> = {
  data: DataItem;
  selectedItemId?: string;
  handleSelectChange?: (item: unknown | undefined) => void;
  defaultLeafIcon?: unknown;
  actions?: React.ReactNode;
};

// Define LeafType as a generic component type specific to DataItem
export type LeafType<DataItem extends TreeDataItem> = React.ComponentType<
  LeafProps<DataItem>
>;

export type TitleLeafProps<DataItem extends TreeDataItem> = {
  data: DataItem;
  handleSelectChange?: (item: DataItem | undefined) => void;
} & LeafProps<DataItem>;

export type TitleLeafType<DataItem extends TreeDataItem> = React.ComponentType<
  TitleLeafProps<DataItem>
>;

export type NodeProps<DataItem extends TreeDataItem> = {
  data: DataItem;
  handleSelectChange: (item: DataItem | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
  defaultNodeIcon?: unknown;
  defaultLeafIcon?: unknown;
  leaf?: LeafType<DataItem>; // Tied to specific DataItem type
  titleLeaf?: TitleLeafType<DataItem>; // Tied to specific DataItem type
  actions?: React.ReactNode;
};

export type TreeItemProps<DataItem extends TreeDataItem> = {
  data: Array<DataItem> | DataItem;
  handleSelectChange: (item: DataItem | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
  defaultNodeIcon?: unknown;
  defaultLeafIcon?: unknown;

  leaf?: LeafType<DataItem>; // Tied to specific DataItem type
  titleLeaf?: TitleLeafType<DataItem>; // Tied to specific DataItem type
  actions?: React.ReactNode;
};

export const treeVariants = cva(
  "group hover:before:opacity-100 before:absolute before:rounded-lg before:-left-0 before:right-0 before:bg-accent before:opacity-0 before:h-[2rem] before:-z-10",
);

export const selectedTreeVariants = cva(
  "before:opacity-100 before:bg-white text-accent-foreground before:z-10",
);

export const verticalLIne =
  "relative vertical-line  before:absolute before:left-1 before:top-0 before:bottom-0 before:w-2 before:border-l before:z-100 [&:last-child]:before:h-4";

export const horizontalLIne =
  "relative horizontal-line after:absolute  after:rounded-bl-lg after:border-l after:left-1 after:top-3.5 after:w-4 after:h-4 after:border-b after:z-100";

export const iconLine =
  "relative transition-left duration-200 after:absolute after:top-11 after:bottom-0 after:left-4 after:w-1  after:border-l group-data-[state=closed]:after:border-l-0";

// Tree component props with a constrained leaf type
export type TreeProps<DataItem extends TreeDataItem> = {
  data: Array<DataItem>;
  leaf?: LeafType<DataItem>; // Tied to specific DataItem type
  titleLeaf?: TitleLeafType<DataItem>; // Tied to specific DataItem type
  defaultNodeIcon?: unknown;
  defaultLeafIcon?: unknown;
  initialSelectedItemId?: string;
  onSelectChange?: <DataType>(item: DataType | undefined) => void;
  verticalLine?: boolean;
  actions?: React.ReactNode;
};

export function Tree<DataItem extends TreeDataItem>({
  data,
  leaf,
  titleLeaf,
  defaultNodeIcon,
  defaultLeafIcon,
  onSelectChange,
  initialSelectedItemId,
  actions,
}: TreeProps<DataItem>) {
  const { selectedItemId, handleSelectChange, expandedItemIds } =
    useTree<DataItem>({
      data,
      initialSelectedItemId,
      onSelectChange,
    });

  return (
    <TreeItem<DataItem>
      actions={actions} // props
      data={data} // props
      leaf={leaf} // props
      titleLeaf={titleLeaf} // props
      defaultLeafIcon={defaultLeafIcon}
      defaultNodeIcon={defaultNodeIcon}
      selectedItemId={selectedItemId} //  hook
      handleSelectChange={handleSelectChange} //  hook
      expandedItemIds={expandedItemIds} //  hook
    />
  );
}
