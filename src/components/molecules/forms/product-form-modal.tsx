"use client";
import React from "react";
import { CategoryDocType } from "@/lib/types/category";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import ProductForm from "@/components/molecules/forms/product/product-form";
import { useDispatch } from "react-redux";
import { onOpenChangeProductModal } from "@/lib/store/features/app/appSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { ProductDocType } from "@/lib/types/product";

function ProductFormModal({
  parentNode,
  edit,
}: {
  parentNode?: CategoryDocType;
  edit?: boolean;
}) {
  const dispatch = useDispatch();

  const open = useAppSelector((state) => state.app.openProductModal);
  const data = useAppSelector((state) => state.app.currentProduct);

  const openChange = React.useCallback(
    (open: boolean) => {
      dispatch(onOpenChangeProductModal(open));
    },
    [dispatch],
  );

  return data ? (
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
        <ProductForm
          categoryId={data.category.id}
          edit={true}
          data={data as ProductDocType}
          afterEndCallback={() => openChange(false)}
        />
      </DialogContent>
    </Dialog>
  ) : null;
}

export default ProductFormModal;
