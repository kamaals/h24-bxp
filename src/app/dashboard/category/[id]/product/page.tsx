/* istanbul ignore file @preserve */
import React from "react";
import { getProductsByCategory } from "@/lib/server-actions/fetch-products";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = (await params).id;
  const products = await getProductsByCategory(categoryId);
  return (
    <div>
      {(products || []).map((p) => {
        return (
          <div key={p.id}>
            <div>{p.name}</div>
            <pre>{JSON.stringify(p)}</pre>
          </div>
        );
      })}
    </div>
  );
}

export default Page;
