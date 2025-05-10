"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/atoms/card";
import Product from "@/components/molecules/product";
import { useGetProductsQuery } from "@/lib/store/api/productServices";
import OrderTool from "@/components/molecules/order-tool";
import { useAppSelector } from "@/lib/store/hooks";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";

function ProductList({ categoryId }: { categoryId?: string }) {
  const { nameOrder, priceOrder } = useAppSelector((state) => state.app);

  const { data } = useGetProductsQuery({
    category: categoryId,
    order: {
      name: nameOrder,
      price: priceOrder,
    },
  });

  return (
    <Card className="col-span-4 lg:col-span-5 bg-slate-100 border-0">
      <CardHeader>
        <h2>Products</h2>
        <OrderTool />
      </CardHeader>
      <CardContent
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
        }
      >
        {(data || []).map((product) => (
          <Product
            product={product as ProductWithCategoryAndAttributeResponseType}
            key={product.id}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default ProductList;
