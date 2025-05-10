"use client";
import React from "react";
import {
  AttributeType,
  ProductWithCategoryAndAttributeResponseType,
} from "@/lib/types/product";
import Image from "next/image";
import Attribute from "@/components/atoms/attribute";
import { Button } from "@/components/atoms/button";
import { useDispatch } from "react-redux";
import {
  onOpenChangeProductModal,
  setSelectedProduct,
} from "@/lib/store/features/app/appSlice";
import ActionConfirm from "@/components/molecules/action-confirm/action-confirm";
import { Edit } from "lucide-react";
import { useDeleteProductMutation } from "@/lib/store/api/productServices";

function Product({
  product,
}: {
  product: ProductWithCategoryAndAttributeResponseType;
}) {
  const [deleteProduct] = useDeleteProductMutation();

  const dispatch = useDispatch();

  return (
    <article className="flex flex-col justify-between p-4 bg-white rounded-[2rem] shadow-md overflow-y-auto">
      <div className={"space-y-4 "}>
        <div className="relative h-48 rounded-3xl overflow-hidden shadow-sm">
          <Image
            fill={true}
            objectFit={"cover"}
            src={
              Array.isArray(product.photo) && product.photo.length
                ? product.photo[0]
                : "https://picsum.photos/id/235/400/300"
            }
            alt={product.name}
          />
          <header
            className={
              "flex items-end pb-4 absolute left-0 bottom-0 right-0 h-20 bg-gradient-to-t from-black/90  to-[rgba(0,0,0,0)] to-100% text-white px-6"
            }
          >
            <div className="flex flex-col">
              <h3 className={"font-black text-sm -mb-0.5 pb-0 "}>
                {product.name}
              </h3>
              <span className={"text-slate-400 text-xs"}>
                {product.category.name}
              </span>
            </div>
          </header>
        </div>
        <section className="p-2">
          <div
            className={
              "flex flex-col flex-1 overflow-hidden pb-1 border-b mb-2"
            }
          >
            <span className={"font-bold text-lg"}>{product.name}</span>
            <span className="text-md text-slate-700">
              {Number(product.price).toFixed(2)} $
            </span>
          </div>
          <div className={"grid grid-cols-2 gap-2 flex-wrap"}>
            {(product.attributes || []).map((attribute, i) => (
              <Attribute
                key={i + product.name}
                attribute={attribute as AttributeType}
              />
            ))}
          </div>
          <p className="text-md text-slate-500 mt-4">{product.description}</p>
        </section>
      </div>
      <footer className="flex justify-between gap-2">
        <div className="w-50">
          <ActionConfirm
            onConfirm={() => {
              deleteProduct(product.id);
            }}
          />
        </div>
        <Button
          variant={"ghost"}
          onClick={() => {
            dispatch(setSelectedProduct(product));
            dispatch(onOpenChangeProductModal(true));
          }}
          type="button"
        >
          <Edit />
          Edit
        </Button>
      </footer>
    </article>
  );
}

export default Product;
