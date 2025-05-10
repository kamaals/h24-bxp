import React from "react";
import { Card, CardContent, CardHeader } from "@/components/atoms/card";
import Product from "@/components/molecules/product";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";

function ProductList({
  products,
}: {
  products: Array<ProductWithCategoryAndAttributeResponseType>;
}) {
  return (
    <Card className="col-span-4 lg:col-span-5 bg-slate-100 border-0">
      <CardHeader>Products</CardHeader>
      <CardContent
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
        }
      >
        {(products || []).map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </CardContent>
    </Card>
  );
}

export default ProductList;
