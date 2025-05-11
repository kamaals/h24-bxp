"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/atoms/card";
import Product from "@/components/molecules/product";
import { useGetProductsQuery } from "@/lib/store/api/productServices";
import OrderTool from "@/components/molecules/order-tool";
import { useAppSelector } from "@/lib/store/hooks";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";
import { useSidebar } from "@/components/molecules/sidebar";
import { Button } from "@/components/atoms/button";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  onOpenChangeProductModal,
  setCategory,
  setSelectedProduct,
  updatePaginationSetupWithCurrentLimit,
} from "@/lib/store/features/app/appSlice";
import ProductPagination from "@/components/molecules/product-pagination";

function ProductList({ categoryId }: { categoryId?: string }) {
  const dispatch = useDispatch();
  const { nameOrder, priceOrder, category, productPagination } = useAppSelector(
    (state) => state.app,
  );

  const { data, isSuccess } = useGetProductsQuery({
    category: categoryId,
    order: {
      name: nameOrder,
      price: priceOrder,
    },
    limit: productPagination.limit,
    offset: productPagination.offset,
  });

  React.useEffect(() => {
    const fetchCategory = async () => {
      const resp = await fetch(`/api/category/${categoryId}`);
      const data = await resp.json();
      dispatch(setCategory(data));
    };

    if (categoryId && !category) {
      fetchCategory().catch(console.log);
    }
  }, [categoryId, category, dispatch]);

  React.useEffect(() => {
    dispatch(updatePaginationSetupWithCurrentLimit(data?.total ?? 0));
  }, [data, dispatch]);

  const { setOpenMobile } = useSidebar();

  React.useEffect(() => {
    setOpenMobile(false);
  }, [categoryId, setOpenMobile]);

  const handleAddProduct = React.useCallback(() => {
    dispatch(setSelectedProduct(null));
    dispatch(onOpenChangeProductModal(true));
  }, [dispatch]);

  console.log(isSuccess);

  return (
    <Card className="bg-slate-100 border-0 min-h-[calc(100vh-8rem)] flex flex-col justify-between">
      <div className="flex-col flex gap-y-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:items-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold flex gap-2">
                {category?.name ?? ""} / Products
              </h2>
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
          {(data?.products || []).map((product) => (
            <Product
              product={product as ProductWithCategoryAndAttributeResponseType}
              key={product.id}
            />
          ))}
        </CardContent>
      </div>
      <CardFooter>
        <ProductPagination />
      </CardFooter>
    </Card>
  );
}

export default ProductList;
