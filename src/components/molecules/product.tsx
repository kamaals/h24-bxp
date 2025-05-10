import React from "react";
import {
  AttributeType,
  ProductWithCategoryAndAttributeResponseType,
} from "@/lib/types/product";
import Image from "next/image";
import Attribute from "@/components/atoms/attribute";

function Product({
  product,
}: {
  product: ProductWithCategoryAndAttributeResponseType;
}) {
  return (
    <article className="space-y-4 p-4 bg-white rounded-[2rem] shadow-md">
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
          className={"flex flex-col flex-1 overflow-hidden pb-1 border-b mb-2"}
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
    </article>
  );
}

export default Product;
