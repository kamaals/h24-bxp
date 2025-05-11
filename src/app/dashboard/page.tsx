/* istanbul ignore file @preserve */

import React from "react";
import PageTitle from "@/components/atoms/page-title";
import CategoriesTree from "@/components/molecules/tree/categories-tree";

async function Page() {
  return (
    <article className={"flex flex-col gap-y-4"}>
      <PageTitle title={"Categories Tree"} />
      <div className={"max-w-lg"}>
        <CategoriesTree />
      </div>
    </article>
  );
}

export default Page;
