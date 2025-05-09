/* istanbul ignore file @preserve */
import React from "react";
import ProductForm from "@/components/molecules/forms/product/product-form";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = (await params).id;
  return <ProductForm categoryId={categoryId} />;
}

export default Page;
