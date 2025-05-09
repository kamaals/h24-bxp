import React from "react";
import { cn } from "@/lib/utils";

export type ActionsProps = {
  children: React.ReactNode;
  isSelected: boolean;
  id?: string;
};

const TreeActions = ({ children, isSelected, id }: ActionsProps) => {
  return (
    <div
      data-testid={`tree-actions-${id}`}
      className={cn(
        isSelected ? "flex" : "hidden",
        "absolute items-center h-10 right-0 z-20",
      )}
    >
      {children}
    </div>
  );
};
export default TreeActions;
