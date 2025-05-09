/* istanbul ignore file @preserve */
import { TreeDataItem } from "@/components/molecules/tree/generic";
import React from "react";

export function addChildrenToNode<DataType extends TreeDataItem>(
  nodes: DataType[],
  targetId: string,
  newChildren: DataType[],
): DataType[] {
  return nodes.map((node) => {
    if (node.id === targetId) {
      return {
        ...node,
        children: [...(node.children || []), ...newChildren] as DataType[],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addChildrenToNode(node.children, targetId, newChildren),
      };
    }
    return node;
  });
}

// Delete a node by ID
export function deleteNode<DataType extends TreeDataItem>(
  nodes: DataType[],
  targetId: string,
): DataType[] {
  return nodes
    .filter((node) => node.id !== targetId) // Remove the node if it matches targetId
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNode(node.children, targetId),
        };
      }
      return node;
    });
}

// Replace a node by ID with a new node
export function replaceNode<DataType extends TreeDataItem>(
  nodes: DataType[],
  targetId: string,
  replacementNode: DataType,
  keepChildren?: boolean,
): DataType[] {
  return nodes.map((node) => {
    if (node.id === targetId) {
      return keepChildren && node.children
        ? {
            ...replacementNode,
            children: [
              ...node.children,
              ...(replacementNode.children
                ? [...replacementNode.children]
                : []),
            ],
          }
        : { ...replacementNode }; // Replace the node entirely
    }
    if (node.children) {
      return {
        ...node,
        children: replaceNode(
          node.children,
          targetId,
          replacementNode,
          keepChildren,
        ),
      };
    }
    return node;
  });
}

export type UseTreeHookParams<DataType extends TreeDataItem> = {
  data: Array<DataType>;
  initialSelectedItemId?: string;
  onSelectChange?: (item: DataType | undefined) => void;
  expandAll?: boolean;
};

export function useTree<DataType extends TreeDataItem>({
  initialSelectedItemId,
  onSelectChange,
  expandAll,
  data,
}: UseTreeHookParams<DataType>) {
  const [selectedItemId, setSelectedItemId] = React.useState<
    string | undefined
  >(initialSelectedItemId);

  const handleSelectChange = React.useCallback(
    (item: DataType | undefined) => {
      setSelectedItemId(item?.id);
      onSelectChange?.(item);
    },
    [onSelectChange],
  );

  const ids: string[] = [];

  const walkTreeItems = React.useCallback(
    (items: Array<DataType> | DataType, targetId: string) => {
      if (Array.isArray(items)) {
        for (let i = 0; i < items.length; i++) {
          ids.push(items[i]!.id);
          if (walkTreeItems(items[i]!, targetId) && !expandAll) {
            return true;
          }
          if (!expandAll) ids.pop();
        }
      } else if (!expandAll && items.id === targetId) {
        return true;
      } else if (items.children) {
        return walkTreeItems(items.children, targetId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [expandAll],
  );

  const expandedItemIds = React.useMemo(() => {
    if (!initialSelectedItemId) {
      return [] as string[];
    }
    walkTreeItems(data, initialSelectedItemId);
    return ids;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, initialSelectedItemId, walkTreeItems]);

  return {
    selectedItemId,
    handleSelectChange,
    expandedItemIds,
  };
}
