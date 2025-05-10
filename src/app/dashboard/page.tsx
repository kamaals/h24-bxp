/* istanbul ignore file @preserve */

import CategoriesTree from "@/components/molecules/tree/categories-tree";
import React from "react";
import PageTitle from "@/components/atoms/page-title";
import ProductList from "@/components/molecules/product-list";
async function Page() {
  return (
    <article className={"flex flex-col gap-y-4"}>
      <PageTitle title={"Dashboard"} />
      <ProductList />
    </article>
  );
}

export default Page;
