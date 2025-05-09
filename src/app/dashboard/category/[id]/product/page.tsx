/* istanbul ignore file @preserve */
import React from "react";
import { getProductsByCategory } from "@/lib/server-actions/fetch-products";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = (await params).id;
  const products = await getProductsByCategory(categoryId);
  return (
    <div>
      {(products || []).map((p) => {
        return (
          <div key={p.id}>
            <Link href={`/dashboard/product/${p.id}`}>{p.name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Page;
