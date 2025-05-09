import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { TitleLeafComponent } from "./leaf";
import { ExpandableContent, ExpandableTrigger } from "./expandable";
import TreeIcon from "./icon";
import TreeActions from "./actions";
import {
  TreeDataItem,
  NodeProps,
  selectedTreeVariants,
  iconLine,
} from "./index";
import TreeItem from "./tree-item";
import { ShineBorder } from "@/components/atoms/shine-border";

function Node<DataItem extends TreeDataItem>({
  data,
  handleSelectChange,
  expandedItemIds,
  selectedItemId,
  defaultNodeIcon,
  defaultLeafIcon,
  leaf,
  actions,
  titleLeaf,
}: NodeProps<DataItem>) {
  const [value, setValue] = React.useState(
    expandedItemIds.includes(data.id) ? [data.id] : [],
  );
  const TitleLeaf = titleLeaf ? titleLeaf : TitleLeafComponent;

  const isSelected = selectedItemId === data.id;

  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={value}
      onValueChange={(s) => setValue(s)}
    >
      <AccordionPrimitive.Item
        className={cn("pl-4 ml-1 group")}
        value={data.id}
      >
        <div className={"flex relative"}>
          <div
            className={cn(
              "flex-grow flex items-start h-11 p-0.5 rounded-lg",
              iconLine,
            )}
          >
            {isSelected && (
              <ShineBorder
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderWidth={2}
              />
            )}
            <ExpandableTrigger
              data-testid={`tree-trigger-${data.id}`}
              className={cn(
                //treeVariants(),
                selectedItemId === data.id && selectedTreeVariants(),
                "has-child before:left-1",
                "flex-grow h-10 2 cursor-pointer ",
              )}
            >
              <TreeIcon
                data={data}
                isSelected={selectedItemId === data.id}
                isOpen={value.includes(data.id)}
                default={defaultNodeIcon}
              />
            </ExpandableTrigger>
            <div
              className={cn("flex-1 border-r rounded-r-lg overflow-hidden")}
              onClick={() => {
                handleSelectChange(data);
                data.onClick?.(data);
              }}
            >
              <TitleLeaf
                className={cn("")}
                data={data}
                // @ts-expect-error: signature
                handleSelectChange={handleSelectChange}
              />
            </div>
          </div>
          <TreeActions isSelected={selectedItemId === data.id}>
            {actions}
          </TreeActions>
        </div>

        <ExpandableContent className={cn("ml-3")}>
          <TreeItem<DataItem>
            leaf={leaf}
            actions={actions}
            data={data.children ? data.children : data}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            defaultLeafIcon={defaultLeafIcon}
            defaultNodeIcon={defaultNodeIcon}
          />
        </ExpandableContent>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

export default Node;
