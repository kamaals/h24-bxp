/* istanbul ignore file @preserve */
import React from "react";
import ProductList from "@/components/molecules/product/product-list";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products List",
  description: "Product list page",
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = (await params).id;
  return (
    <>
      <ProductList categoryId={categoryId} />
    </>
  );
}

export default Page;
