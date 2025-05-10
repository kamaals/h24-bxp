"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/atoms/card";
import Product from "@/components/molecules/product";
import { useGetProductsQuery } from "@/lib/store/api/productServices";
import OrderTool from "@/components/molecules/order-tool";
import { useAppSelector } from "@/lib/store/hooks";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";
import { useSidebar } from "@/components/molecules/sidebar";
import { Button } from "@/components/atoms/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { onOpenChangeProductModal } from "@/lib/store/features/app/appSlice";

function ProductList({ categoryId }: { categoryId?: string }) {
  const { nameOrder, priceOrder } = useAppSelector((state) => state.app);

  const { data } = useGetProductsQuery({
    category: categoryId,
    order: {
      name: nameOrder,
      price: priceOrder,
    },
  });

  const dispatch = useDispatch();

  const { setOpenMobile } = useSidebar();

  React.useEffect(() => {
    setOpenMobile(false);
  }, [categoryId]);

  const handleAddProduct = React.useCallback(() => {
    dispatch(onOpenChangeProductModal(true));
  }, [dispatch]);

  return (
    <Card className="col-span-4 lg:col-span-5 bg-slate-100 border-0">
      <CardHeader>
        <div className={"flex justify-between items-center"}>
          <div className={"flex flex-col gap-2"}>
            <h2 className="text-3xl font-bold">Products</h2>
            <OrderTool />
          </div>
          <Button onClick={handleAddProduct} variant="ghost" type="button">
            <Plus />
            Add Product
          </Button>
        </div>
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
