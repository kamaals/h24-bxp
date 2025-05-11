"use client";
import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { EllipsisVertical, Plus, Edit, List } from "lucide-react";
import ActionConfirm from "@/components/molecules/action-confirm/action-confirm";
import React from "react";

type Props = {
  addAction?: () => void;
  deleteAction?: () => void;
  editAction?: () => void;
  addProduct?: () => void;
  showProducts?: () => void;
};

export function LeafAction({
  addAction,
  deleteAction,
  editAction,
  addProduct,
  showProducts,
}: Props) {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          data-testid="leaf-action-toggle"
          type="button"
          size="sm"
          variant="ghost"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        data-testid="leaf-action-dropdown"
        align={"end"}
        className="w-56"
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            data-testid={"leaf-action-dropdown-add"}
            onClick={addAction}
          >
            <Plus /> Add Child Category
          </DropdownMenuItem>
          <DropdownMenuItem
            data-testid={"leaf-action-dropdown-edit"}
            onClick={editAction}
          >
            <Edit /> Edit
          </DropdownMenuItem>
          <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
            <ActionConfirm onConfirm={deleteAction} />
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={addProduct}
            data-testid={"leaf-action-dropdown-add-product"}
          >
            <Plus /> Add Product
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={showProducts}
            data-testid={"leaf-action-dropdown-add-product"}
          >
            <List /> View Products
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
