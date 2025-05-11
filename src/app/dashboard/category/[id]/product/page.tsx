/* istanbul ignore file @preserve */
import React from "react";
import ProductList from "@/components/molecules/product-list";
async function Page({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = (await params).id;
  console.log(categoryId);
  return (
    <>
      <ProductList categoryId={categoryId} />
    </>
  );
}

export default Page;
