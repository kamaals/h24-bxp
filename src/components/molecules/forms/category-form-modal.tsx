import React from "react";
import { CategoryDocType } from "@/lib/types/category";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import CategoryForm from "@/components/molecules/forms/category-form";

function CategoryFormModal({
  open,
  openChange,
  parentNode,
  edit,
}: {
  open: boolean;
  openChange: (open: boolean) => void;
  parentNode?: CategoryDocType;
  edit?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {parentNode
              ? edit
                ? `Editing ${parentNode.name}`
                : `Add new under: ${parentNode.name}`
              : "Add New Capability"}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          edit={edit}
          data={
            edit && parentNode
              ? {
                  name: parentNode.name,
                  id: parentNode.id,
                }
              : undefined
          }
          afterEndCallback={() => openChange(false)}
          parentId={parentNode?.id}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CategoryFormModal;
