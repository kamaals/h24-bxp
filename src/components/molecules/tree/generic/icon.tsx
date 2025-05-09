import React from "react";
import { TreeDataItem } from "./index";

export type IconProps<DataItem extends TreeDataItem> = {
  data: DataItem;
  isOpen?: boolean;
  isSelected?: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  default?: any;
};

function TreeIcon<DataItem extends TreeDataItem>({
  data,
  isOpen,
  isSelected,
  default: defaultIcon,
}: IconProps<DataItem>) {
  let Icon = defaultIcon;
  let testId = `icon`;
  if (isSelected && data.selectedIcon) {
    Icon = data.selectedIcon;
    testId = "selected-icon";
  } else if (isOpen && data.openIcon) {
    Icon = data.openIcon;
    testId = "open-icon";
  } else if (data.icon) {
    Icon = data.icon;
  }
  return Icon ? (
    <Icon
      data-testid={testId}
      className="h-4 w-4 shrink-0 mr-2 relative z-20"
    />
  ) : (
    <></>
  );
}

export default TreeIcon;
