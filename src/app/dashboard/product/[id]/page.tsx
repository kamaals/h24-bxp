/* istanbul ignore file @preserve */
import React from "react";
import { getProductById } from "@/lib/db/controlls/product";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";
import Product from "@/components/molecules/product/product";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Dtails",
  description: "Product CRUD Categories list",
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getProductById(
    id,
  )) as ProductWithCategoryAndAttributeResponseType;
  return product ? <Product product={product} /> : null;
}

export default Page;
