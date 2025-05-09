import React from "react";
import { getProductById } from "@/lib/db/controlls/product";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  return product ? (
    <article>
      <header>
        <h2>{product.name}</h2>
      </header>
    </article>
  ) : null;
}

export default Page;
