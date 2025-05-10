/* istanbul ignore file @preserve */
import React from "react";
import ProductList from "@/components/molecules/product-list";
import ProductFormModal from "@/components/molecules/forms/product-form-modal";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = (await params).id;
  return (
    <>
      <ProductFormModal />
      <ProductList categoryId={categoryId} />
    </>
  );
}

export default Page;
