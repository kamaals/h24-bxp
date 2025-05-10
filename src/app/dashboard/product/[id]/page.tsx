import React from "react";
import { getProductById } from "@/lib/db/controlls/product";
import Link from "next/link";
import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getProductById(
    id,
  )) as ProductWithCategoryAndAttributeResponseType;
  return product ? (
    <article>
      <header>
        <h2 className="text-3xl font-bold text-slate-700">{product.name}</h2>
        <h4 className="text-slate-500">
          <Link href={`/dashboard/category/${product.category.id}/product`}>
            {product.category.name}
          </Link>
        </h4>
      </header>
    </article>
  ) : null;
}

export default Page;
