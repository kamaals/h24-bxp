"use client";
import React from "react";
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

function ProductFormModal() {
  const dispatch = useDispatch();

  const open = useAppSelector((state) => state.app.openProductModal);
  const data = useAppSelector((state) => state.app.currentProduct);
  const categoryId = useAppSelector((state) => state.app.categoryId);

  const openChange = React.useCallback(
    (open: boolean) => {
      dispatch(onOpenChangeProductModal(open));
    },
    [dispatch],
  );

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data ? `Editing ${data.name}` : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          categoryId={data ? data.category.id : (categoryId as string)}
          edit={!!data}
          data={data as ProductDocType}
          afterEndCallback={() => openChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ProductFormModal;
