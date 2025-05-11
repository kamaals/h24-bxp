/* istanbul ignore file @preserve */
import React from "react";
import ProductList from "@/components/molecules/product/product-list";
async function Page({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = (await params).id;
  return (
    <>
      <ProductList categoryId={categoryId} />
    </>
  );
}

export default Page;
