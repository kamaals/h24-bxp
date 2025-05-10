/* istanbul ignore file @preserve */
import React from "react";
import { getProductsByCategory } from "@/lib/server-actions/fetch-products";
import ProductList from "@/components/molecules/product-list";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = (await params).id;
  const products = (await getProductsByCategory(
    categoryId,
  )) as Array<ProductWithCategoryAndAttributeResponseType>;
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default Page;
